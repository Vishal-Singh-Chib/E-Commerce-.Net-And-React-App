import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: 4,
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to My Store
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Your one-stop shop for everything you need! From the latest trends and reliable essentials to tech gear and unique finds — we've got it all in one place.
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Explore our curated catalog and discover products you'll love. Quality, variety, and convenience delivered with care.
        </Typography>

        <Button
          component={Link}
          to="/catalog"
          variant="contained"
          size="large"
          sx={{ mt: 3 }}
        >
          Time to Shop!
        </Button>
      </Container>
    </Box>
  );
}

