import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  useTheme,
  IconButton,
  styled,
  ListItemButtonProps
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

// Create a custom type for ListItem with Link
type ListItemLinkProps = ListItemButtonProps & {
  to: string;
  children: React.ReactNode;
};

const ListItemLink = ({ to, children, ...props }: ListItemLinkProps) => {
  return (
    <ListItem 
      component={Link}
      to={to}
      {...props}
      sx={{
        '&.MuiListItem-root': {
          px: 3,
          py: 1,
          borderRadius: 1,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          '&.Mui-selected': {
            backgroundColor: 'action.selected',
          },
        },
      }}
    >
      {children}
    </ListItem>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItemLink to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemLink>
        <ListItemLink to="/applications">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItemLink>
        <ListItemLink to="/attendance">
          <ListItemIcon>
            <CalendarIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
        </ListItemLink>
        <ListItemLink to="/laborers">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Laborers" />
        </ListItemLink>
      </List>
      <Divider />
      <List>
        <ListItemLink to="/settings">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemLink>
      </List>
    </Drawer>
  );
};

export default Sidebar;