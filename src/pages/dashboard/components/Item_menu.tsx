import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const Item_Menu = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export const stylesTable = () => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: 36,
    },
    title: {
      flexGrow: 1,
      display: 'block',
      color: "#fff"
    },
});
  