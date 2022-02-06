db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "store",
    },
  ],
})

db.createCollection("accounts")

db.accounts.insert({
  username: "roni",
  email: "roni@gmail.com",
  password:
    "$2b$10$J/ICCEE1WkcBwRwZHXtXhuNMIl2duVjxPOgiv8m2eHwUqsuZ/jd4i",
  accountType: "Admin",
})

db.createCollection("categories")

db.categories.insert({
  name: "pictures",
  label: "Pictures",
  icon: "image",
})
