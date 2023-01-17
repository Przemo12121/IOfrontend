import { Box, Divider, Typography } from "@mui/material"
import { useTheme } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser } from "../../hooks/store";
import Popover from "@mui/material/Popover/Popover";
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from "@mui/material/MenuItem";
import logoutAction from "../../hooks/useLogout";

export const Header = () => {
  const theme = useTheme()
  const user = getUser()

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };


  return (
    <Box
      height={'48px'}
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      padding={'0 20px 0 20px'}
      sx={{ backgroundColor: theme.palette.primary.main }}
      gap={'12px'}
      boxShadow={4}
    >
      <Typography variant="project">Projekt Bazy Danych 2 - Portal informacyjny</Typography>
      { user &&
        <>
          <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <Typography 
              fontSize={'20px'}
              fontWeight={'700'}
              color={'white'}
              >
              {user.role}
            </Typography> 
            
            <IconButton onClick={handleClick}>
              <AccountCircleIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem
              disableRipple
              sx={{
                ':hover': {
                  cursor: 'auto',
                  backgroundColor: 'white'
                }
              }}
            >
              {user.email}
            </MenuItem>
            <MenuItem
              disableRipple
              sx={{
                ':hover': {
                  cursor: 'auto',
                  backgroundColor: 'white'
                }
              }}
            >
              <Divider sx={{width: '100%' }}/>
            </MenuItem>
            <MenuItem onClick={() => logoutAction()}>Wyloguj</MenuItem>
          </Popover>
        </> 
      }
    </Box>
  )
}