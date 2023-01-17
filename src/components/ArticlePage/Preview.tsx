import { Box, Typography } from '@mui/material';
import parse from 'react-html-parser'
import { CategoryDto } from '../../types';
import { ChapterDto } from '../../hooks/types';

type Props = {
  title?: string
  text?: string
}

export const Preview = (props: Props) => {
  return (
    <Box
      height={'68vh'}
      display={'flex'}
      flexDirection={'column'}
      padding={'16px 32px 16px 32px'}
      overflow={'scroll'}
      width={'95%'}
      border={'1px solid'}
      sx={{
        backgroundColor: '#f0f0f0',
        overflowWrap: 'break-word'
      }}
    >
      {/* <Typography variant='category'>{props.category?.name ?? '<<CATEGORY>>'}</Typography> */}
      <Typography
        fontSize={'24px'}      //TODO from article style
        sx={{ fontWeight: 700 }}
        width={'100%'}
        textAlign={'center'}
      >
        {props.title ? props.title : '<<TITLE>>'}
      </Typography>
      <Typography
        marginTop={'16px'}
        marginBottom={'32px'}
        width={'100%'}
        textAlign={'center'}
        sx={{ fontSize: '16px' }} //TODO from article style
      >
        {props.text ? parse(props.text.replace(/\n/g, '</br>')) : ' '}
      </Typography>

      {/* {props.chapters?.map((chapter, index) => (
        <>
          <Typography
            marginTop={'24px'}
            fontSize={'18px'}      //TODO from article style
            sx={{ fontWeight: 700 }}
            width={'100%'}
            textAlign={'left'}
          >
            {`${index + 1}. ${chapter.subtitle ? chapter.subtitle : '<<TITLE>>'}`}
          </Typography>
          <Typography 
            sx={{ fontSize: '14px' }} //TODO from article style
          >
            {chapter.text ? parse(chapter.text.replace(/\n/g, '</br>')) : ' '}
          </Typography>
        </>
      ))} */}

      {/* <Box width={'100%'} display={'flex'} flexDirection={'row'} gap={'8px'} marginTop={'20px'}>
        {
          props.tags && props.tags.length > 0 &&
          props.tags.map(tag => (
            <Typography variant='tag'>{tag}</Typography>
          ))
        }
      </Box> */}
    </Box>
  )
}