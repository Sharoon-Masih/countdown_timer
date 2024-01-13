import inquirer from "inquirer";
import {differenceInSeconds} from "date-fns" //this package is imported for using differenceInSeconds() method.

let ans=await inquirer.prompt({
    type:"number", //remember yaha type number hi rahe bcuz agr string rakhega toh kiu ka function ma value number pass hogi toh tabhi wo proper work krega iss liya yaha type number hi ho.
    name:"count",
    message:"Enter the time for countdown in seconds:",
    validate:(ans:number)=>{
        if(isNaN(ans))  //NaN(Not a Number) yeh condition iss liya lgyi hai taka ka agr user koi string value put krdey instead of 'number' so wo isko message return kray.//and remember jab be asi condition lgani hai isNaN() ka method use krna hai we cannot do this by using simple condition like this : if(ans === NaN) 
        {
          return "please enter a numeric value";
        }
        else if( ans > 60)
        {
        return "value of second should be less than or equal to 60" //yeh humna iss liya lgyi hai bcuz hum yeh chah rahay hain ka humara timer more than 60 seconds pa nahi chalega.
        }
        return true;
    }
})

function timer(val:number){
    let initialSec=new Date().setSeconds(new Date().getSeconds()+val)  //yeh pura function iss tarah work kr rha hai ka step1 ma jo be current second hongay usme user jo seconds input krega wo add haojayega.then,step2 ma jo humna setInterval() ka method use kia hai wo func ko har second bad repeat krega means that ka jo functionalities setInterval() ka andar ki hain wo har second bd run hongi toh yeh phr iss tarah wor krega ka har second bd intervalTime jo set kia hai usme ma say currentTime minus hojayega by using differenceInSecond()  method jo toh jasay jasay current time increase hoga interval time toh ek fix hogya hna wo change nahi hoga but current time real time ka a/c change hoga so thats why jo countdown ma humna second set kia hongay wo decrease hotay jayega or at the end jab zero hojayegay toh function stop hojayega.
    let interval=new Date(initialSec)
    setInterval(()=>{
        let CurrentTime=new Date();
        let timeDiffernce=differenceInSeconds(interval,CurrentTime)
        let min=Math.floor((timeDiffernce % 3600)/(60)); //this formula will like jo be timedifference ayega seconds ma usko divide krega total seconds say jo 1 hour ma hotay hai that is '3600' or wo seconds 3600 sa divide hongay toh usme jo complete hour hongay wo remove hojayegay like agar timedifference in second 5000 hai toh jab 3600 sa divide hongay toh wo '1 hour and 23 mins' bnayegay toh kiu ka hum remainder lay rahay hai toh jo complete one hour hai usko remove krka wo just "23" mins return krega as a remainder in second form that is "1380 seconds" and then phr jab un remainder seconds ko total second in 1 min that is "60" seconds sey divide krdega toh humara pss total minute ajayegay. 
        let sec=Math.floor((timeDiffernce % 60));//yeh formula jo timeDifference in second ayega na usko total number of seconds in a min that is "60" say divide krdega toh jo usme complete minute hongay usko remove krka remaining seconds return krdega.for e.g if timedifference in seconds is "150 seconds" so jab wo 150 divide hongay 60 seconds sa toh remainder "30" seconds reh jayega bcuz 120 seconds is = 2 min and "30" will be remaining second toh wo return hojayga.
    if(timeDiffernce <= 0)
    {
        console.log("Its over");
        process.exit() // yeh line iss liya likhi hai taka jab timeDifference "0" ho toh wo process stop hojaye otherwise wo chalta rahega towards minus side like -1,-2,-3 
        
    }
    else
    {
        console.log(`${min.toString().padEnd(2,"0")}:${sec.toString().padStart(2,"0")}`); //iss line ma humna min ka sth "min.tostring().padEnd()" iss liya use kia hai taka output ma single zero na likha ay it will like pehla min ko string ma convert kia or then padEnd() ek string ka method hai jiska pehla parameter ma yeh define kia ka kitnay number of string chaiya or second parameter ma jo string value chaiya thi wo likhdi like here we want "0" isi tarah "sec" ko b string kia or usme padStart() iss lia lgya bcuz usme "0" starting ma chaiya.
        
    }
    },1000)
}
//calling above timer func
timer(ans.count)


// let newSec=dateObj.setSeconds(30) //basically this .setSecond() method in Date() object will set second value in the Date() object for e.g: if we write setSecond(30) now here as we write '30' so when we output it, it prints "30" in Date obj at the part of seconds.
// console.log(new Date(newSec)); //remember when we direct console "newSec" it print garbage value which we cant understand bcuz we use .setSecond method with 'dateobj' so to print it in proper format we pass the "newSec" as argument to Date obj.

//what is setInterval method?
// In the context of programming and specifically the setInterval method, an "interval" refers to a time period or duration between repeated executions of a function or a piece of code. The setInterval function is used to schedule the repeated execution of a function at fixed intervals.

// For example, if you set an interval of 1000 milliseconds (1 second) using setInterval, the specified function will be called every 1000 milliseconds. The time between each execution is the interval.
