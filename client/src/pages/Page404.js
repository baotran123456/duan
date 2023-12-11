import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box } from '@mui/material';
// components
import Page from '../components/Page';
import hinhanh404 from '../assets/404-error.png';


// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <Container>
      <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Xin lỗi, không tìm thấy trang!
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Rất tiếc, chúng tôi không thể tìm thấy trang mà bạn tìm kiếm.
        </Typography>

        <div style={{
          padding: '5% 0',
          width: '100%', display: 'flex',
          justifyContent: 'space-around', textAlign: 'center', alignItems: 'center'
        }} className="number">
          <img className='img' src={hinhanh404} alt="login" width={'80%'} />

        </div>

        <Button to="/" size="medium" variant="contained" component={RouterLink}>
          QUAY LẠI
        </Button>
      </ContentStyle>
    </Container>
  );
}
