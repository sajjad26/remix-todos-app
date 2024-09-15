### Build
`docker build -t my-remix-app .`

### Start container
`docker run -p 3000:3000 -e DATABASE_URL="mysql://root:todos@host.docker.internal:3309/todos" my-remix-app`