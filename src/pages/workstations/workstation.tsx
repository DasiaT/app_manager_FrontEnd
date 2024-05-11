import { Button, Grid } from "@mui/material"
import { IWorstationFilters } from "../../stores/users/interfaces/IWorkstation";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { useGetWorkstationQuery } from "../../stores/users/workstationAPI";
import { tableBase } from "../dashboard/components/functions_generales";
import { columns_Workstation } from "./components/columns_Workstation";
import SearchInput from "../../components_generals/search_input";
import { FormAddGeneral } from "./components/modal_Workstation";
import { IWorstation } from "../../stores/users/interfaces/IWorkstation";
import { FormWorkstationPatch } from "./components/modal_WorkstationPatch";

export const WorkstationManager = () => {

    const [guardadoExitoso, setGuardadoExitoso] = useState(false);//PARA NOTIFICAR EL GUARDADO EN MODAL

    const [isModalOpenPOST, setIsModalOpenLocal] = useState<boolean>(false);//PARA INGRESAR NUEVO
    
    const [isModalOpenPATCH, setIsModalOpenPATCH] = useState<boolean>(false);//PARA EDITAR

    const [query, setQuery] = useState<IWorstationFilters>({ id: 0, search: '', take: 0, skip: 0 })//PARA EL BUSCADOR

    const [selectedRow, setSelectedRow] = useState<IWorstation>({ id: 0, name: '' });//PARA MANDAR LOS DATOS AL MODAL PATCH

    const { data, isLoading, isFetching, refetch } = useGetWorkstationQuery(query)//API 

    const [paginationModel, setPaginationModel] = useState<{ pageSize: number; page: number }>({
        pageSize: 0,
        page: 0,
    });

    //PARA LA PAGINACION
    useEffect(() => {
        setQuery((prev) => ({
            ...prev,
            take: paginationModel.pageSize,
            skip: paginationModel.page * paginationModel.pageSize,
        }));
    }, [paginationModel]);

    //PARA EL MODAL
    useEffect(() => {
        if ((!isModalOpenPOST || !isModalOpenPATCH) && guardadoExitoso) {
            setGuardadoExitoso(false);
            refetch();
        }
    }, [isModalOpenPOST,isModalOpenPATCH,guardadoExitoso, refetch]);


    //PARA EL MODAL PATCH
    const OpenModalPatch = (rowData: IWorstation) => {
        setSelectedRow(rowData);
        setIsModalOpenPATCH(true);
    };

    return (
        <>
            <Grid container spacing={2} sx={{ width: '100%' }}>
                <FormWorkstationPatch
                    datos={selectedRow}
                    isModalOpen={isModalOpenPATCH}
                    setIsModalOpen={setIsModalOpenPATCH}
                    setIsSaveExist={setGuardadoExitoso}
                />

                <FormAddGeneral 
                isModalOpen={isModalOpenPOST} 
                setIsModalOpen={setIsModalOpenLocal} 
                setIsSaveExist={setGuardadoExitoso}
                />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4} lg={9}>
                        <SearchInput onInput={(e) => setQuery((prev) => ({ ...prev, search: e.currentTarget?.value }))} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            size="small"
                            startIcon={<AddIcon />}
                            onClick={() => setIsModalOpenLocal(true)}
                        >
                            Agregar
                        </Button>
                    </Grid>

                </Grid>
                <DataGrid
                    {...tableBase}
                    rows={data?.result || []}
                    columns={columns_Workstation({ OpenModalPatch })}
                    loading={isLoading || isFetching}
                    paginationMode="server"
                    rowCount={data?.count || 0}
                    getRowId={(row) => row.id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onRowDoubleClick={(params) => OpenModalPatch(params.row as IWorstation)}
                />
            </Grid>

        </>
    )
}
