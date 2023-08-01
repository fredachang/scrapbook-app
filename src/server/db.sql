CREATE TABLE users (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    salt VARCHAR(100) NOT NULL, 
    password VARCHAR(100) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE channels (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    is_private BOOLEAN NOT NULL DEFAULT FALSE,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    updated TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE blocks (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
    image_path VARCHAR(255),
    image_data TEXT,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE connections (
    id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),,
    block_id UUID NOT NULL,
    channel_id UUID NOT NULL,
    user_id UUID NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (block_id) REFERENCES blocks(id),
    FOREIGN KEY (channel_id) REFERENCES channels(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);