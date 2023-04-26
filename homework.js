//==========Exercise #1 ===========//
/*
Write a function that parses through the below object and displays all of their
favorite food dishes as shown:
*/

let person3 = {
    pizza:["Deep Dish","South Side Thin Crust"],
    tacos:"Anything not from Taco bell",
    burgers:"Portillos Burgers",
    ice_cream:["Chocolate","Vanilla","Oreo"],
    shakes:[{ //  this is a LIST where index 0 is a dictionary
        oberwise:"Chocolate",
        dunkin:"Vanilla",
        culvers:"All of them",
        mcDonalds:"Sham-rock-shake",
        cupids_candies:"Chocolate Malt"
    }]
}




// Solution # 1 - using toString() / split()
const createString = (list) => {
    let s = ''
    for (let i = 0; i < list.length; i++) {
        if (i == 0) {
            s += `My favorite types of ${list[i].replace('_', ' ')} are `
        } else if (i == (list.length - 1) && (list.length > 2)) {
            s += `and ${list[i]}.\n` // end of item more than just 1 item
        } else if (i == (list.length - 1)) {
            s += `${list[i]}.\n` // list is 1 item
        } else if (list.length < 4) {
            s += `${list[i]} ` // if no commas
        } else {
            s += `${list[i]}, ` // if regular item
        }
    } return s
}

const getMyFavorites = (person) => {
    let returnedString = ''
    for (item of Object.entries(person)) {
        if (typeof item[1][0] == 'object') {
            returnedString += `My favorite types of ${item[0]} are: `
            for (let k=0; k < (Object.entries(item[1][0]).length); k++) {
                if (k < (Object.entries(item[1][0]).length) - 1) {
                    // not the last
                    returnedString += `${Object.entries(item[1][0])[k][1]} from ${Object.entries(item[1][0])[k][0].charAt(0).toUpperCase() + Object.entries(item[1][0])[k][0].slice(1)}, `
                } else {
                    // the last
                    returnedString += `and ${Object.entries(item[1][0])[k][1]} from ${Object.entries(item[1][0])[k][0].charAt(0).toUpperCase() + Object.entries(item[1][0])[k][0].slice(1).replace('_', ' ')}. \n`
                }
            }
        } else {
            //console.log(item.toString().split(','))
            returnedString += createString(item.toString().split(','))
        }
    } return returnedString;
}
console.log(getMyFavorites(person3))



// Solution #2 -- Testing out how switch statements work, based on type
const printFavoriteFood = (person) => {
    faveFoodsString = '';
    for (let i = 0; i < Object.entries(person).length; i++) {
        // switch based on type
        switch(typeof Object.entries(person)[i][1]){
            case "string":
                faveFoodsString += `My favorite ${Object.entries(person)[i][0]} are ${Object.entries(person)[i][1]}.\n`
                break
            case "object":
                let num = Number(Object.keys(Object.entries(person)[i][1][0])[0])
                if (isNaN(num)) {
                    // for the list holding an object at index 0
                    // loop through the dictionary
                    faveFoodsString += `My favorite types of ${Object.entries(person)[i][0]} are: `
                    for (let k = 0; k < Object.entries((Object.entries(person)[i][1][0])).length; k++) {
                        if (k < (Object.entries((Object.entries(person)[i][1][0])).length) - 1) {
                            faveFoodsString += `${(Object.entries((Object.entries(person)[i][1][0]))[k][1])} from ${(Object.entries((Object.entries(person)[i][1][0]))[k][0]).charAt(0).toUpperCase() + (Object.entries((Object.entries(person)[i][1][0]))[k][0]).slice(1)}, `
                        } else {
                            faveFoodsString += `and ${(Object.entries((Object.entries(person)[i][1][0]))[k][1])} from ${(Object.entries((Object.entries(person)[i][1][0]))[k][0]).charAt(0).toUpperCase() + (Object.entries((Object.entries(person)[i][1][0]))[k][0]).slice(1).replace('_', ' ')}.\n`
                        } 
                    }
                } else {
                    // for the regular lists
                    newTitle = Object.entries(person)[i][0].replace('_', ' ') // remove _ from 'ice_cream'
                    faveFoodsString += `My favorite types of ${newTitle} are `
                    for (let j = 0; j < Object.entries(person)[i][1].length; j++) {
                        if (j < (Object.entries(person)[i][1].length - 1)) {
                            if (Object.entries(person)[i][1].length > 2) {
                                faveFoodsString += `${Object.entries(person)[i][1][j]}, `
                            } else {
                                faveFoodsString += `${Object.entries(person)[i][1][j]} ` // remove the comma if only 2 items
                            }
                        } else {
                            faveFoodsString += `and ${Object.entries(person)[i][1][j]}.\n`
                        }
                    }
                }
                break
            default:
                break
        } 
    }
    return faveFoodsString;
}

console.log(printFavoriteFood(person3))

//=======Exercise #2=========//
/*
Write an object prototype for a Person that has a name and age, has a
printInfo method, and also has a method that 
increments the persons age by 1 each time the method is called.
Create two people using the 'new' keyword, and print 
both of their infos and increment one persons
age by 3 years. Use an arrow function for both methods
*/

// Create our Person Prototype
function Person (name, age) {
    this.name = name;
    this.age = age;

    // Use an arrow to create the printInfo method
    this.printInfo = () => {
        return `Hi! I'm ${this.name} and I am ${this.age} years old.`
    }
    // Create another arrow function for the addAge method that takes a single parameter.
    // it says above it should only add 1 each time the method is called
    this.celebrateBirthday = (number=1) => {
        this.age += number;
        console.log(`Happy birthday, ${this.name.split(' ')[0]}! You are now ${this.age}. Hope it's a good one.`)
    }
}

const phineas = new Person('Phineas Flynn', 10);
console.log(phineas.printInfo())
const ferb = new Person('Ferb Fletcher', 10);
console.log(ferb.printInfo())
// increase age 3 times
for (let i=0; i <3; i++) {
    ferb.celebrateBirthday()
}
console.log(ferb.printInfo())
phineas.celebrateBirthday(3) // if we want to skip ahead 3 years
console.log(phineas.printInfo())


// The same, but as a class
class Human {
    constructor (name, age=0) {
        this.name = name;
        this.age = age;
        this.alive = true;
    }
    printInfo = () => {
        console.log(`Hi! I'm ${this.name} and I am ${this.age} years old.`)
    }
    celebrateBirthday = (number=1) => {
        this.age += number;
        console.log(`Happy birthday, ${this.name.split(' ')[0]}! You are now ${this.age}. Hope it's a good one.`)
    }

}
const violet = new Human('Violet Parr', 14)
violet.printInfo()
violet.celebrateBirthday()

// =============Exercise #3 ============//
/*

    Create a Promised based function that will check a string to determine 
    if its length is greater than 10.
    If the length is greater than ten console log "Big word". 
    If the length of the string is less than 10 console log "Small Number"
*/
const getBigWord = (word) => {
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            if (word.length <= 10) {
                rej('Small word') // I changed this from Number bc it made more sense
            } res('Big word')
        }, 2000) // let's give it 2 seconds
    })
}

// Then / Catch
getBigWord('noodles')
.then((resData)=>{
    console.log(resData, '(from .then())')
})
.catch((rejData)=>{
    console.log(rejData, '(from .catch())')
})


// ASYNC - I like this better because you can call the function on diff parameters easily
const gettingBigWord = async (word) => {
    try {
        const myResponse = await getBigWord(word)
        console.log(myResponse, '(from async/await)')
    } catch (errorVar){
        console.log(errorVar, '(from try/catch)')
    }
}
gettingBigWord('supercalifragilisticexpialidocious')
gettingBigWord('tiny')

// =============Exercise #4: CodeWars ============//
/*
    Who likes it? - 6kyu
    https://www.codewars.com/kata/5266876b8f4bf2da9b000362

You probably know the "like" system from Facebook and other pages. People can 
"like" blog posts, pictures or other items. We want to create the text that 
should be displayed next to such an item.

Implement the function which takes an array containing the names of people that 
like an item. It must return the display text as shown in the examples:

[]                                -->  "no one likes this"
["Peter"]                         -->  "Peter likes this"
["Jacob", "Alex"]                 -->  "Jacob and Alex like this"
["Max", "John", "Mark"]           -->  "Max, John and Mark like this"
["Alex", "Jacob", "Mark", "Max"]  -->  "Alex, Jacob and 2 others like this"

Note: For 4 or more names, the number in "and 2 others" simply increases.

*/
function likes(names) {
    switch(names.length) {
        case 0:
          return 'no one likes this'
        case 1:
          return `${names[0]} likes this`
        case 2:
          return `${names[0]} and ${names[1]} like this`
        case 3:
          return `${names[0]}, ${names[1]} and ${names[2]} like this`
        default:
          return `${names[0]}, ${names[1]} and ${names.length - 2} others like this`
    }
  }

// =============Exercise #5: CodeWars ============//
/*
    Detect Pangram - 6kyu
    https://www.codewars.com/kata/545cedaa9943f7fe7b000048

A pangram is a sentence that contains every single letter of the alphabet at 
least once. For example, the sentence "The quick brown fox jumps over the lazy 
dog" is a pangram, because it uses the letters A-Z at least once (case is 
irrelevant).

Given a string, detect whether or not it is a pangram. Return True if it is, 
False if not. Ignore numbers and punctuation.
*/
function isPangram(string){
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    let used_alph = {}
    for (letter of string) {
      if (alphabet.includes(letter.toLowerCase())) {
        used_alph[letter.toLowerCase()] = true;
      }
      console.log(Object.keys(used_alph).length)
    } return (Object.keys(used_alph).length == 26)
}