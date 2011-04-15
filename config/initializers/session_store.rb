# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_confres_session',
  :secret      => 'c66c199509ed94f5189a8012baf121b547ff3e7889aa3d0633f0d673075f271c0ae62e66037223d9ea9cab528071b0ffcde67f3ce6d3ac7fe2e92f57dba85d6a'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
