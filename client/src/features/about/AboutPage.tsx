import {  Typography, Container } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ paddingY: 6 ,color: 'text.primary', fontSize: { xs: '1rem', md: '1.1rem' }}}>
      <Typography variant="h3" gutterBottom>
        About Us
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to My Store, your trusted destination for quality products and exceptional shopping experiences. Our mission is to bring you a curated selection of the best items that cater to your needs and passions.
      </Typography>

      <Typography variant="body1" paragraph>
        We believe in quality, affordability, and excellent customer service. Whether you’re browsing for the latest tech gadgets, stylish apparel, or everyday essentials, we carefully select products that meet our high standards.
      </Typography>

      <Typography variant="body1" paragraph>
        Our dedicated team is committed to making your shopping easy, fun, and reliable. From seamless browsing to fast delivery, we strive to exceed your expectations every step of the way.
      </Typography>

      <Typography variant="body1" paragraph>
        Thank you for choosing My Store. We look forward to serving you!
      </Typography>
    </Container>
  );
}
