filterTable () {
  const raw = this.route.snapshot.queryParams.q

  if (typeof raw === 'string' && raw.trim().length > 0) {

    const safeQuery = raw
      .trim()
      .substring(0, 100)

    this.dataSource.filter = safeQuery.toLowerCase()
    this.searchValue = safeQuery

    this.gridDataSource.subscribe((result: any) => {
      this.emptyState = result.length === 0
    })

  } else {
    this.dataSource.filter = ''
    this.searchValue = undefined
    this.emptyState = false
  }
}