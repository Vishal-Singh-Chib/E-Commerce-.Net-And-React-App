// import { decreament,increament } from "./counterReducer"
// import { Button, ButtonGroup, Typography } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../app/store/store";

 
// export default function ContactPage() {
// const {data} = useAppSelector(state=>state.counter);
// const dispatch = useAppDispatch();

//   return (
//     <div> 
//       <Typography variant='h2'>
//           Contact Page 
//       </Typography>
//       <Typography variant='body1'>
//         The Data is : {data}
//       </Typography>
//       <ButtonGroup>
//         <Button onClick={()=>dispatch(increament(1))} color="secondary">Increament</Button>
//         <Button onClick={()=>dispatch(decreament(1))} color='error'>Decreament</Button>
//         <Button onClick={()=>dispatch(increament(5))} color='primary'>Increament by 5</Button>
//       </ButtonGroup>
      
//     </div>
//   )
// }

import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';

export default function ContactPage() {
  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h3" gutterBottom>
        Contact Us
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.primary', fontSize: { xs: '1rem', md: '1.1rem' } }} paragraph>
        Have questions, feedback, or need help with your order? We're here to assist you.
        Whether it's a product inquiry, shipping info, or technical issue — don’t hesitate to reach out.
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, marginY: 4 }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography>Email: singhvishal07@gmail.com</Typography>
        <Typography>Phone: +91 (855) 707-7687</Typography>
        <Typography>Address: 1234 Tech Lane, San Francisco, CA 94107</Typography>

        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">Support Hours:</Typography>
          <Typography>Mon – Fri: 9:00 AM – 6:00 PM</Typography>
          <Typography>Saturday: 10:00 AM – 4:00 PM</Typography>
          <Typography>Sunday: Closed</Typography>
        </Box>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Send Us a Message
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Name" variant="outlined" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Your Email" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Subject" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{alignContent:'center'}} color="primary">
              Submit Message
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
