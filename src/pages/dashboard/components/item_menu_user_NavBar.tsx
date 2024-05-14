import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { obtenerDatosUsuario } from '../../../components_generals/user_datos';
import { Grid } from '@mui/material';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function UserMenuNavBar() {

    const user = obtenerDatosUsuario();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    //marginLeft: 'auto'
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            <Grid container justifyContent={'space-between'}>
                <Grid item>
                    <CardContent sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', padding: 0 }}>
                        <Grid item>
                            <Typography fontWeight="md" textColor="white" fontSize={12}>
                                {user?.informationUser.name} {user?.informationUser.surnames}
                            </Typography>
                            <Chip size="sm" variant="outlined" color="success" sx={{ mt: 1, fontSize: 12 }}>
                                {user?.informationUser.informationWorkstation.name}
                            </Chip>
                        </Grid>
                    </CardContent>
                </Grid>

                <Grid item>
                    <Tooltip title="User Settings" placement="left">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, marginLeft: 2 }}>
                            <Avatar alt={user?.informationUser.name + " " + user?.informationUser.surnames} src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>

            <Menu
                sx={{ mt: '20px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>


    );
}
export default UserMenuNavBar;
