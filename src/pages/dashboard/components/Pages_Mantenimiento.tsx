import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import MoreTimeTwoToneIcon from '@mui/icons-material/MoreTimeTwoTone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { IMenu } from "../interfaz/IMenu";
import { clearLocalStorage } from '../../login/components/singout';
import { WorkstationManager } from '../../workstations/workstation';


export const pages_mantenimiento2: IMenu[] = [
    { label: 'Inventario', icon: <MoreTimeTwoToneIcon />, path: '/', content: '' },
    { label: 'Empleados', icon: <PersonAddAltTwoToneIcon />, path: '/empleados', content: <WorkstationManager/>},
    { label: 'Marcaje', icon: <MoreTimeTwoToneIcon />, path: '/marcaje', content: ''},
    { label: 'Salir', icon: <ExitToAppIcon />, path: '/LoginOut', content: '', OnClick: clearLocalStorage},
];

export const pages_mantenimiento: IMenu[] = [
    { label: 'Inventario', icon: <MoreTimeTwoToneIcon />, path: '/', content: '', itemSon: pages_mantenimiento2 },
    { label: 'Empleados', icon: <PersonAddAltTwoToneIcon />, path: '/empleados', content: <WorkstationManager/>},
    { label: 'Marcaje', icon: <MoreTimeTwoToneIcon />, path: '/marcaje', content: ''},
    
];

