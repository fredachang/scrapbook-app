# scrapbook-app

Scrapbook is a text and image visual moodboarding web app inspired by Are.na (https://www.are.na/). The primary aim of the project is to familiarise myself with the full-stack workflow using React Typescript and setting up a relational database in PostgresSQL. To allow for a social aspect like Are.na, user profiles are created and maintained through a manual authentication set up using JWT tokens. Once logged in, the user is able to create channels, and upload 'blocks' of text or image within those channels. The 'connect' button allows for any individual block to be easily linked to any other channel, or if the channel doesn't already exist, create a channel during the connection process. Each block maintains its unique Id and is only stored once in the database to maximise efficiency, with connections maintained in a separate table. 

As this is only a practice project, image data is stored direclty in the database as base64 string, which can create load and scalability issues. For a real application with a lot of users, the ideal approach as adopted by Are.na is to store image data externally through Amazon CloudFront etc. Also note with Are.na there is a chrome extension which allows users to add images directly from other sites instead of having to download it first or copy its path. This is out of scope for this project but would be an ideal for a more seamless experience. 


https://github.com/fredachang/scrapbook-app/assets/128881398/23be3438-fbb2-4b96-b245-cc95d3ecdda4

