-- Create the trigger function
CREATE OR REPLACE FUNCTION enforce_single_settings_row()
  RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND (SELECT COUNT(*) FROM "AppSettings") = 0) THEN
    RETURN NEW;
  ELSIF (TG_OP = 'UPDATE' AND (SELECT COUNT(*) FROM "AppSettings") <= 1) THEN
    RETURN NEW;
  ELSE
    RAISE EXCEPTION 'Only one instance allowed in the AppSettings table';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_enforce_single_settings_row
  BEFORE INSERT OR UPDATE ON "AppSettings"
  FOR EACH ROW
  EXECUTE FUNCTION enforce_single_settings_row();
