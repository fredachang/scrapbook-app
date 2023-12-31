# scrapbook-app

Scrapbook is a text and image visual moodboarding web app inspired by [Are.na](https://www.are.na/). The primary aim of the project is to familiarise myself with the full-stack workflow using React Typescript for front-end and a relational database such as PostgresSQL for back-end. To allow for a social aspect like Are.na, user profiles are created and maintained through a manual authentication process using JWT tokens. Once logged in, the user is able to create channels, and upload 'blocks' of text or image within those channels. The 'connect' button allows for any individual block to be easily linked to any other channel, or if the channel doesn't already exist, create a channel during the connection process. Each block maintains its unique Id and is only stored once in the database to maximise efficiency, with connections maintained in a separate table. Only blocks contained within public channels will be visible on the feed, blocks that are exclusively within private channels will be visible to the user only. The UI is kept relatively simple to not detract from the focus on the moodboard and its visual storytelling.

As this is only a practice project, several limitations are noted: 
- Image data is stored direclty in the database as base64 string, which can create load and scalability issues. For a real application with a lot of users, the ideal approach as adopted by Are.na is to store image data externally through Amazon CloudFront etc.
-  Are.na offers a chrome extension which allows users to add images directly from other sites instead of having to download it first or copy its path. This is out of scope for this project but would be an ideal for a more seamless experience.
-  Feed is organised chronologically rather than through a more complex algorithm as the focus is on the full-stack set up rather than a full social platform experience. There is no functionality to follow other users; instead everyone will be able to see and access all blocks in public channels. 

Please note the live site is hosted on a free instance and can take a couple of minutes to spin up during first load. 

Check out the [Live Site](https://freda-arena-clone.onrender.com/login)!

https://github.com/fredachang/scrapbook-app/assets/128881398/23be3438-fbb2-4b96-b245-cc95d3ecdda4

