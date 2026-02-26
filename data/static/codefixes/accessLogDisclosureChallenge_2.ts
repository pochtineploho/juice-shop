app.use('/ftp',  express.static(path.resolve('ftp'), {index: false, redirect: false}))

app.use('/support/logs', isAuthorized(), isAdmin(), express.static(path.resolve('logs')))

if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

app.use(express.static(path.resolve('frontend/dist/frontend')))
app.use(cookieParser(process.env.COOKIE_SECRET))