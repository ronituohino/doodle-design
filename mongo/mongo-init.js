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
db.createCollection("categories")
db.createCollection("files")
db.createCollection("products")

db.accounts.insert({
  username: "roni",
  email: "roni@gmail.com",
  password:
    "$2b$10$J/ICCEE1WkcBwRwZHXtXhuNMIl2duVjxPOgiv8m2eHwUqsuZ/jd4i", // 123qwe123
  accountType: "Admin",
})

db.accounts.insert({
  username: "jare",
  email: "jare@gmail.com",
  password:
    "$2b$10$J/ICCEE1WkcBwRwZHXtXhuNMIl2duVjxPOgiv8m2eHwUqsuZ/jd4i", // 123qwe123
  accountType: "Customer",
})

db.categories.insert({
  _id: ObjectId("61f519593c71ee71cd5270fd"),
  urlPath: "socks",
  label: { en: "Socks", fi: "Sukat" },
  icon: "tag",
})

db.categories.insert({
  _id: ObjectId("61f519593c71ee71cd5270fe"),
  urlPath: "shoes",
  label: { en: "Shoes", fi: "Kengät" },
  icon: "tag",
})

db.files.insert({
  _id: ObjectId("61f51b243c71ee71cd527114"),
  filename: "socks_dots.png",
  mimetype: "image/png",
  encoding: "7bit",
})

db.files.insert({
  _id: ObjectId("61f51b243c71ee71cd527115"),
  filename: "socks_stripes.png",
  mimetype: "image/png",
  encoding: "7bit",
})

db.files.insert({
  _id: ObjectId("61f51b243c71ee71cd527116"),
  filename: "socks_zebra.png",
  mimetype: "image/png",
  encoding: "7bit",
})

db.files.insert({
  _id: ObjectId("61f51b243c71ee71cd527124"),
  filename: "sneakers_left.png",
  mimetype: "image/png",
  encoding: "7bit",
})

db.files.insert({
  _id: ObjectId("61f51b243c71ee71cd527125"),
  filename: "sneakers_right.png",
  mimetype: "image/png",
  encoding: "7bit",
})

db.files.insert({
  _id: ObjectId("61f51b243c71ee71cd527126"),
  filename: "sneakers_top.png",
  mimetype: "image/png",
  encoding: "7bit",
})

db.products.insert({
  _id: ObjectId("61f51b243c71ee71cd527222"),
  name: {
    en: "Sneakers",
    fi: "Lenkkarit",
  },
  price: {
    EUR: 45,
  },
  images: [
    ObjectId("61f51b243c71ee71cd527124"),
    ObjectId("61f51b243c71ee71cd527125"),
    ObjectId("61f51b243c71ee71cd527126"),
  ],
  customization: [
    {
      label: {
        en: "Size",
        fi: "Koko",
      },
      options: [
        {
          en: "36",
          fi: "36",
        },
        {
          en: "37",
          fi: "37",
        },
        {
          en: "38",
          fi: "38",
        },
        {
          en: "39",
          fi: "39",
        },
        {
          en: "40",
          fi: "40",
        },
        {
          en: "41",
          fi: "41",
        },
        {
          en: "42",
          fi: "42",
        },
        {
          en: "43",
          fi: "43",
        },
        {
          en: "44",
          fi: "44",
        },
      ],
    },
  ],
  description: {
    en: "The official Doodle Design sneakers featuring the classic Doodle Design stripes. Make your summer really pop with these on your feet!",
    fi: "Official Doodle Design lenkkarit, joiden kyljissä hohtavat klassiset Doodle Design raidat. Tuo kesääsi loistoa näillä lenkkareilla!",
  },
  category: ObjectId("61f519593c71ee71cd5270fe"),
  visible: true,
})

db.products.insert({
  _id: ObjectId("61f51b243c71ee71cd527231"),
  name: {
    en: "Socks - Dots",
    fi: "Sukat - Pisteet",
  },
  price: {
    EUR: 5,
  },
  images: [ObjectId("61f51b243c71ee71cd527114")],
  customization: [],
  description: {
    en: "Doodle Design dotted socks",
    fi: "Doodle Design pistesukat",
  },
  category: ObjectId("61f519593c71ee71cd5270fd"),
  visible: true,
})

db.products.insert({
  _id: ObjectId("61f51b243c71ee71cd527232"),
  name: {
    en: "Socks - Stripes",
    fi: "Sukat - Raidat",
  },
  price: {
    EUR: 5,
  },
  images: [ObjectId("61f51b243c71ee71cd527115")],
  customization: [],
  description: {
    en: "Doodle Design striped socks",
    fi: "Doodle Design raitasukat",
  },
  category: ObjectId("61f519593c71ee71cd5270fd"),
  visible: true,
})

db.products.insert({
  _id: ObjectId("61f51b243c71ee71cd527233"),
  name: {
    en: "Socks - Zebra",
    fi: "Sukat - Seepra",
  },
  price: {
    EUR: 8,
  },
  images: [ObjectId("61f51b243c71ee71cd527116")],
  customization: [],
  description: {
    en: "Doodle Design zebra socks",
    fi: "Doodle Design seeprasukat",
  },
  category: ObjectId("61f519593c71ee71cd5270fd"),
  visible: true,
})
