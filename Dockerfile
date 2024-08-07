FROM oven/bun:latest

WORKDIR /documentation

COPY . /documentation/

# install the dependencies

ENV SERVER_PORT=3003

RUN cd /documentation
RUN bun add -D vitepress
RUN bun docs:build

# run the frontend

EXPOSE ${SERVER_PORT}

ENTRYPOINT [ "bun", "docs:preview" ]