-- Add the increment_user_coins function that's used in the webhook
CREATE OR REPLACE FUNCTION increment_user_coins(user_id_param UUID, coins_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE public.users 
  SET 
    coins = coins + coins_to_add,
    updated_at = NOW()
  WHERE id = user_id_param;
  
  -- Check if the user exists
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with ID % not found', user_id_param;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;