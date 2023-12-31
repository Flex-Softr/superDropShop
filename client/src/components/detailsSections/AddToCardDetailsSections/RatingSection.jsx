import { Rating, Typography } from '@mui/material'

const RatingSection = () => {
    return (
        <div className='flex gap-2'>
            <Rating name="half-rating-read" color='ratingIcon' defaultValue={4.5} precision={0.5} readOnly />
            <Typography variant="p" component="h2">4.8 start rating</Typography>
            <Typography variant='p' color="gray">(6380)</Typography>
        </div>
    ) 
}

export default RatingSection
