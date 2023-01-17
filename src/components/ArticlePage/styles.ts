import { SxProps } from '@mui/material'

export const textFieldSx: SxProps = {
  '.MuiInputBase-root': {
    height: '100px',
    maxHeight: '100px',
    //overflow: 'scroll'
  },
  '.MuiInputBase-input': {
    //height: '100px',
    textAlign: 'start',
    maxHeight: '80px',
    overflow: 'scroll',
    // /paddingTop: '20px',
    fontSize: '14px'
  }
}