import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import MoreTimeTwoToneIcon from '@mui/icons-material/MoreTimeTwoTone';
import { IMenu } from "../interfaz/IMenu";
import { WorkstationManager } from '../../workstations/workstation';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';


export const pages_settings: IMenu[] = [
  { label: 'Workstation', icon: <AssignmentIndRoundedIcon />, path: '/Workstation', content: <WorkstationManager /> },
  { label: 'Empleados', icon: <PersonAddAltTwoToneIcon />, path: '/empleados', content: '' }
];

export const pages_general_route: IMenu[] = [
  {label: 'Configuraciones', icon: <SettingsIcon />, path: '/Settings', content: '', children: pages_settings },
  { label: 'Marcaje', icon: <MoreTimeTwoToneIcon />, path: '/User', content: '' }
];




