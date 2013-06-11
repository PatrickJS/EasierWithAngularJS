# Be sure to restart your server when you modify this file.

# Your secret key is used for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!

# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
# You can use `rake secret` to generate a secure secret key.

# Make sure your secret_key_base is kept private
# if you're sharing your code publicly.
Server::Application.config.secret_key_base = '28b5f919bf67ddb293e4dbe433dc5d43d5d282f9cc7db62c3a0c379a7d73ad6d1fbf2e61d1ac17cd5d5ab843de845eabefb4d21b7d9aa916861a5c3872005cd2'
