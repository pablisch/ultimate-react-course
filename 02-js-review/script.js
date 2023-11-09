const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

const books = getBooks();

const titles = books.map(book => book.title);

const usefulBookInfo = books.map(book => 
  ({
    title: book.title,
    pages: book.pages,
  })
)

const longBooks = books.filter(book => book.pages > 500)
const longBookTitles = longBooks.map(book => book.title);

// longBookTitles;

const names = ['Anna', 'Li', 'Charlie', 'Mary', 'Jo'];

// Using a predicate function and `filter` to get only names shorter than 3 letters.
const NameIsShorterThanThree = names.filter(name => name.length < 3)


const pickedBooks = books.filter(book => book.pages > 500).map(book => book.title);
pickedBooks;

const totalPages = books.reduce((acc, curr) => acc + curr.pages, 0);
totalPages;

const arr = [13, 76, 4, 875, 34, 234, 3, 7, 1];
const sorted = [...arr].sort((a, b) => a - b);
console.log(sorted) // => [ 1, 3, 4, 7, 13, 34, 76, 234, 875 ]
console.log(arr) // => [ 13, 76, 4, 875, 34, 234, 3, 7, 1 ]

usefulBookInfo

const bookInfo = [ { title: 'The Lord of the Rings', pages: 1216 },
{ title: 'The Cyberiad', pages: 295 },
{ title: 'Dune', pages: 658 },
{ title: 'Harry Potter and the Philosopher\'s Stone',
  pages: 223 },
  { title: 'A Game of Thrones', pages: 835 }]

const sortedBooks = [...bookInfo].sort((a, b) => a.title.localeCompare(b.title));

console.log(sortedBooks) // => [ 
// { title: 'A Game of Thrones', pages: 835 },
// { title: 'Dune', pages: 658 },
// { title: 'Harry Potter and the Philosopher\'s Stone', pages: 223 },
// { title: 'The Cyberiad', pages: 295 },
// { title: 'The Lord of the Rings', pages: 1216 } ]

const people = [
  {name: "Sam", age: 40},
  {name: "Tim", age: 44},
  {name: "Rui", age: 42},
]

const newPerson = { name: "Ami", age: 32 };
const morePeople = [...people, newPerson];

morePeople

const lessPeople = people.filter(person => person.name !== "Tim");

lessPeople

const updatedPeople = people.map(person => person.name === "Sam" ? { ...person, age: 41 } : person);
const updatedPeople2 = people.map(person => person.name === "Rui" ? { ...person, name: "Lui" } : person);


updatedPeople
updatedPeople2

const fetchData = async () => {
  const results = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await results.json();
  console.log(data[0]);
}

fetchData()