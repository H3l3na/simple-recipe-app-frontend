import React from 'react';
import Rating from '@mui/material/Rating';
import { Snackbar, Alert } from '@mui/material';
import { useMutation } from 'react-query';
import { rateRecipe } from '../../services/ratingService';

interface RecipeStarRatingProps {
  className?: string;
  currentRating?: number;
  recipeId: number;
  numberOfRatings: number;
  onRatingUpdate?: (newAverage: number, newTotal: number) => void; // Add callback prop
}

export function RecipeStarRating(props: RecipeStarRatingProps) {
  const {
    currentRating,
    recipeId,
    numberOfRatings,
    className,
    onRatingUpdate,
  } = props;
  const [stars, setStars] = React.useState<number>(currentRating || 0);
  const [totalRatings, setTotalRatings] =
    React.useState<number>(numberOfRatings);
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  const { mutate } = useMutation(
    (ratingObject: { recipeId: number; stars: number }) =>
      rateRecipe(ratingObject),
    {
      onSuccess: (data) => {
        console.log('Recipe rating added!');
        const { averageRating, numberOfRatings: newTotal } = data;
        setStars(averageRating); // Update stars with new average
        setTotalRatings(newTotal); // Update total ratings

        // Call parent callback if provided
        if (onRatingUpdate) {
          onRatingUpdate(averageRating, newTotal);
        }

        setOpenSnackbar(true);
      },
      onError: (error) => {
        console.error('Error rating recipe', error);
      },
    }
  );

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleRecipeRating = (newValue: number | null) => {
    if (newValue !== null) {
      setStars(newValue);
      mutate({ recipeId, stars: newValue });
    }
  };

  return (
    <div className={className}>
      <Rating
        name="recipe-rating"
        value={stars}
        onChange={(event, newValue) => handleRecipeRating(newValue)}
      />
      <span style={{ marginLeft: '8px', fontSize: '14px', color: '#555' }}>
        ({totalRatings})
      </span>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Thank you for rating!
        </Alert>
      </Snackbar>
    </div>
  );
}
