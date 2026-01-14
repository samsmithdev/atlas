# A.T.L.A.S. (Assistive Technology Leveraging Automated Systems)

## Project Overview

A.T.L.A.S. aims to be a personal assistant focused on accessibility and accommodations, especially for neurodivergent users.

While recommendations abound for organizing tasks and information, the majority of them rely on manual, dedicated maintenance, often times involving dozens of small decisions for basic workflows. As a late-diagnosed neurodivergent developer myself, I've tried many of them throughout my career and schooling, but I keep running into the same issue:

After a few weeks of putting things where they belong, something would come up that would keep me too busy, I'd spend less time placing things in the right spot or cleaning them up after, and eventually, while I'm already overly busy and under-supported, my own system becomes a job in itself just to find basic information.

I've tried exploring pre-existing options, but ultimately I've either been looking for more advanced features, or I haven't had enough free time to justify learning developing for something that is a single-use kind of tech. 

Given all of that, A.T.L.A.S. was the clear choice for a portfolio app while I learn NextJS. 

## Tech Stack

The top priority for A.T.L.A.S. is to maintain data sovereignty and user privacy. The most pressing challenges are important, personal ones at least in my experience, and the details that would let a system like this be helpful are often sensitive and protected. Offloading transcriptions or un-encrypted data storage to an independent third-party introduces a security risk that would keep me from using it at least. 

- NextJS (web app)
- Postgresql (database server)

Any future additions will be reviewed for a variety of factors, including privacy, security, accessibility, and others.

### NextJS Reasoning

I pivoted from iOS development to web development including React for a variety of work reasons. Coming from that background, I appreciated NextJS being open-source, and the development patterns have been familiar enough that I've been able to translate a lot of conceptual background context quickly. 

To be completely honest, though, the biggest factors were using React at work and having an upcoming API project that I can also use these skills for. One win can be hard enough to find, I didn't want to miss out on a win-win.

### Postgresql Reasoning

I wanted a relational database since it fit more in with how I'm trying to organize data. My uncle was a librarian and I love reading, so the hierachical structure fits with how I'm organizing data, the relationships between entities are vital in this setup rather than unstructured data like social media posts, and fast search is critical for how I plan to use it. 

Just like NextJS though, I also had another category of "wins". PostgreSQL is the top database system in [Stack Overflow's 2025 Developer Survey](https://survey.stackoverflow.co/2025/technology). I've also explored a little bit of [Paperless NGX](https://docs.paperless-ngx.com/) and want to be able to consider integrations in the future. Finally, I explored some N8N before deciding I just wanted to code things directly (again, rather than learn another system to do the same thing), and PostgreSQL's Vectors extension for LLM/embeddings integration is something I want to keep open as well.

## Downloading and Running

### Requirements

- Docker (or a PostgreSQL server)
- Node >= 24.12.0

### Steps

(Note: These assume that you'll be using the included Docker Compose stack for the infrastructure of the app)

1. Download project repo
2. Copy example-env.txt to .env
3. Enter values for the variables defined in .env
4. Run `docker compose up -d` from the project root
5. Run `npm i && npm run prisma:push && npm run prisma:generate && npm run dev`