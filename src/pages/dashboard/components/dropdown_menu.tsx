import * as React from 'react';
import Menu, { menuClasses } from '@mui/joy/Menu';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import Sheet from '@mui/joy/Sheet';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import { pages_general_route } from './Pages_Mantenimiento';
import { NavLink } from 'react-router-dom';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    menu: React.ReactElement;
    open: boolean;
    onOpen: (
        event?:
            | React.MouseEvent<HTMLButtonElement>
            | React.KeyboardEvent<HTMLButtonElement>,
    ) => void;
    onLeaveMenu: (callback: () => boolean) => void;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modifiers: any[];
}



function NavMenuButton({ children, menu, open, onOpen, onLeaveMenu, label, modifiers, ...props }: Omit<MenuButtonProps, 'color'>) {
    const isOnButton = React.useRef(false);
    const internalOpen = React.useRef(open);

    const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        internalOpen.current = open;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            onOpen(event);
        }
    };

    return (
        <Dropdown
            open={open}
            onOpenChange={(_, isOpen) => {
                if (isOpen) {
                    onOpen?.();
                }
            }}
        >
            <MenuButton
                {...props}
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                onMouseDown={() => {
                    internalOpen.current = open;
                }}
                onClick={() => {
                    if (!internalOpen.current) {
                        onOpen();
                    }
                }}
                onMouseEnter={() => {
                    onOpen();
                    isOnButton.current = false;//para cerrar al dar clic
                }}
                onMouseLeave={() => {
                    isOnButton.current = false;
                }}
                onKeyDown={handleButtonKeyDown}
                sx={{
                    bgcolor: open ? 'neutral.plainHoverBg' : undefined,
                    '&:focus-visible': {
                        bgcolor: 'neutral.plainHoverBg',
                    },
                }}
            >
                {children}
            </MenuButton>
            {React.cloneElement(menu, {
                onMouseLeave: () => {
                    onLeaveMenu(() => isOnButton.current);
                },
                modifiers,
                slotProps: {
                    listbox: {
                        id: `nav-example-menu-${label}`,
                        'aria-label': label,
                    },
                },
                placement: 'right-start',
                sx: {
                    width: 200,
                    [`& .${menuClasses.listbox}`]: {
                        '--List-padding': 'var(--ListDivider-gap)',
                    },
                },
            })}
        </Dropdown>
    );
}
export const MenuSideNav: React.FC<{
    openMenu: boolean;
    navbarSize: number;
}> = ({ openMenu, navbarSize }) => {
    const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
    const [selectedItemMenu, setSelectedItemMenu] = React.useState<null | number>(null);
    const [selectedItem, setSelectedItem] = React.useState<null | number>(null);
    const [selectedIcon, setSelectedIcon] = React.useState<null | number>(null);

    const createHandleLeaveMenu = (index: number) => (getIsOnButton: () => boolean) => {
        setTimeout(() => {
            const isOnButton = getIsOnButton();
            if (!isOnButton) {
                setMenuIndex((latestIndex: null | number) => {
                    if (index === latestIndex) {
                        return null;
                    }
                    return latestIndex;
                });
            }
        }, 200);
    };

    const modifiers = [
        {
            name: 'offset',
            options: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                offset: ({ placement }: any) => {
                    if (placement.includes('end')) {
                        return openMenu ? [-8, (navbarSize - 46)] : [8, 5]; // Cambia los valores según el estado de openMenu
                    }
                    return openMenu ? [-8, (navbarSize - 46)] : [8, 5]; // Cambia los valores según el estado de openMenu
                },
            },
        },
    ];

    return (
        <Sheet sx={{ borderRadius: 'sm', py: 1, mr: 20 }}>
            <List>
                {pages_general_route.map((items, index) => (
                    <ListItem key={items.label}>
                        <NavMenuButton
                            label={items.label}
                            open={menuIndex === index}
                            onOpen={() => setMenuIndex(index)}
                            onLeaveMenu={createHandleLeaveMenu(index)}
                            style={{ minHeight: 20, justifyContent: openMenu ? 'initial' : 'center', }}
                            modifiers={modifiers}
                            menu={
                                <Menu onClose={() => setMenuIndex(null)} modifiers={modifiers}>
                                    <ListItem
                                        key={items.label}
                                        disablePadding
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: openMenu ? 'initial' : 'center',
                                            px: 2.5,
                                        }} >
                                        <ListItemIcon sx={{ minWidth: 0, mr: openMenu ? 1 : 'auto', justifyContent: 'center', color: selectedItemMenu === index ? 'blue' : '' }}>
                                            {items.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={items.label} sx={{ opacity: openMenu ? 1 : 1, color: openMenu ? 'black' : 'black', marginLeft: openMenu ? 1 : 1 }} />
                                    </ListItem>
                                    <Divider></Divider>
                                    {items && items.children ? items.children.map((items_children, childIndex) => (
                                        <ListItem
                                            key={items_children.label}
                                            disablePadding
                                            sx={{ display: 'block', color: selectedItem === childIndex ? 'blue' : '', }} >

                                            <ListItemButton
                                                component={NavLink}
                                                to={items.path + items_children.path}
                                                sx={{
                                                    minHeight: 15,
                                                    justifyContent: openMenu ? 'initial' : 'center',
                                                    px: 2.5,
                                                }}
                                                onClick={() => {
                                                    setSelectedItem(childIndex); // Actualizar el ítem seleccionado
                                                    setSelectedIcon(childIndex);
                                                    setSelectedItemMenu(index);
                                                }}
                                            >
                                                <Tooltip disableFocusListener title={items_children.label} placement="right">
                                                    <ListItemIcon sx={{ minWidth: 0, mr: openMenu ? 1 : 'auto', justifyContent: 'center', color: selectedIcon === childIndex ? 'inherit' : 'black' }}>
                                                        {items_children.icon}
                                                    </ListItemIcon>
                                                </Tooltip>
                                                <ListItemText primary={items_children.label} sx={{ opacity: openMenu ? 1 : 1, color: openMenu ? 'black' : 'black', marginLeft: 1 }} />

                                            </ListItemButton>
                                        </ListItem>
                                    )) : <h1>sin items</h1>}
                                </Menu>
                            }
                        >

                            <ListItemIcon sx={{ minWidth: 0, mr: openMenu ? 2 : 'auto', justifyContent: 'center', color: selectedItemMenu === index ? 'blue' : '' }}>
                                {items.icon}
                            </ListItemIcon>
                            <ListItemText primary={items.label} sx={{ opacity: openMenu ? 1 : 0, color: openMenu ? 'black' : 'black', marginLeft: openMenu ? 1 : 1 }} />
                        </NavMenuButton>
                    </ListItem>
                ))}
            </List>
        </Sheet>
    );
}