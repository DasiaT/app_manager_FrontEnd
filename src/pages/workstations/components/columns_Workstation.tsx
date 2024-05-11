import { GridColDef } from "@mui/x-data-grid"
import { IWorstation } from "../../../stores/users/interfaces/IWorkstation"
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

type ColumnProps = {
  OpenModalPatch: (row: IWorstation) => void;
  OpenModalDelete: (row: IWorstation) => void;
}

export const columns_Workstation: (props: ColumnProps) => GridColDef<IWorstation>[] = ({ OpenModalPatch, OpenModalDelete }) => [
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
      <EditTwoToneIcon onClick={() => OpenModalPatch(params.row)} style={{ color: 'blue' }}>
      </EditTwoToneIcon>
    ),
  },
  {
    field: 'delete',
    headerName: 'Eliminar',
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <DeleteForeverTwoToneIcon onClick={() => OpenModalDelete(params.row)} style={{ color: 'red' }}>
      </DeleteForeverTwoToneIcon>
    ),
  }
]

