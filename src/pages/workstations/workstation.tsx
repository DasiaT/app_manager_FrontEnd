import { Button, Grid } from "@mui/material"
import { IWorstationFilters } from "../../stores/users/interfaces/IWorkstation";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "sonner";
import { tableBase } from "../dashboard/components/functions_generales";
import { columns_Workstation } from "./components/columns_Workstation";
import SearchInput from "../../components_generals/search_input";
import { IWorstation } from "../../stores/users/interfaces/IWorkstation";
import { useGetWorkstationQuery } from "../../stores/users/workstationAPI";
import { FormWorkstationPost } from "./components/modal_WorkstationPost";
import { FormWorkstationPatch } from "./components/modal_WorkstationPatch";
import { FormWorkstationDelete } from "./components/modal_WorkstationDelete";
import { Handler_error_api } from "../../stores/interfaces generales/Base_Handler_Error_Api";


export const WorkstationManager = () => {

    const [guardadoExitoso, setGuardadoExitoso] = useState(false);//PARA NOTIFICAR EL GUARDADO EN MODAL

    const [isModalOpenPOST, setIsModalOpenLocal] = useState<boolean>(false);//PARA INGRESAR NUEVO
    
    const [isModalOpenPATCH, setIsModalOpenPATCH] = useState<boolean>(false);//PARA EDITAR

    const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);//PARA ELIMINAR

    const [query, setQuery] = useState<IWorstationFilters>({ id: 0, search: '', take: 0, skip: 0 })//PARA EL BUSCADOR

    const [selectedRow, setSelectedRow] = useState<IWorstation>({ id: 0, name: '' });//PARA MANDAR LOS DATOS AL MODAL PATCH Y DELETE

    const { data, isLoading, isFetching, refetch, error, isError } = useGetWorkstationQuery(query)//API DEL STORE

    const [paginationModel, setPaginationModel] = useState<{ pageSize: number; page: number }>({//PAGINACION DE TABLA INICIAL
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
        if ((!isModalOpenPOST || !isModalOpenPATCH  || isModalOpenDelete) && guardadoExitoso) {
            setGuardadoExitoso(false);
            refetch();
        }

        if(isError || error) {
            const errorMessage = Handler_error_api(error);
            
            errorMessage.map((result)=> {
                toast.error(result);
            })
        }

    }, [isModalOpenPOST,isModalOpenPATCH, isModalOpenDelete, guardadoExitoso, refetch, isError, error]);


    //PARA EL MODAL PATCH
    const OpenModalPatch = (rowData: IWorstation) => {
        setSelectedRow(rowData);
        setIsModalOpenPATCH(true);
    };

    //PARA EL MODAL DELETE
    const OpenModalDelete = (rowData: IWorstation) => {
        setSelectedRow(rowData);
        setIsModalOpenDelete(true);
    };

    return (
        <>
            <Grid container spacing={2} sx={{ width: '100%' }}>
                
                <FormWorkstationPost 
                isModalOpen={isModalOpenPOST} 
                setIsModalOpen={setIsModalOpenLocal} 
                setIsSaveExist={setGuardadoExitoso}
                />

                <FormWorkstationPatch
                    datos={selectedRow}
                    isModalOpen={isModalOpenPATCH}
                    setIsModalOpen={setIsModalOpenPATCH}
                    setIsSaveExist={setGuardadoExitoso}
                />

                <FormWorkstationDelete
                    datos={selectedRow}
                    isModalOpen={isModalOpenDelete}
                    setIsModalOpen={setIsModalOpenDelete}
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
                    columns={columns_Workstation({ OpenModalPatch, OpenModalDelete })}
                    loading={isLoading || isFetching}
                    paginationMode="server"
                    rowCount={data?.count || 0}
                    getRowId={(row) => row.id}
                    paginationModel={paginationModel}
                    pageSizeOptions={[5, 10, 25, 50, 100, 0]}
                    onPaginationModelChange={setPaginationModel}
                    onRowDoubleClick={(params) => OpenModalPatch(params.row as IWorstation)}
                />
            </Grid>

        </>
    )
}
