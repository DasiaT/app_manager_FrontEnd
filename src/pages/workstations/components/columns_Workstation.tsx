import { GridColDef } from "@mui/x-data-grid"
import { IWorstation } from "../../../stores/users/interfaces/IWorkstation"
import { Button } from "@mui/material"

type ColumnProps = {
  OpenModalPatch: (row: IWorstation) => void;
}

export const columns_Workstation: (props: ColumnProps) => GridColDef<IWorstation>[] = ({ OpenModalPatch }) => [
  {
    field: 'id',
    headerName: 'ID',
    width: 100,
    flex: 0,
  },
  {
    field: 'name',
    headerName: 'Nombre',
    width: 100,
    flex: 1,
  },
  {
    field: 'edit',
    headerName: 'Editar',
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => OpenModalPatch(params.row)}
      >
        Editar
      </Button>
    ),
  }
]

