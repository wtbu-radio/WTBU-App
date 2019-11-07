import axios from 'axios'
import HTMLParser from 'fast-html-parser'
import { Show, Recording } from '../modules/Show'


const archiveURL = 'http://headphones.bu.edu/'

const rowIsHeader = function(rowString : string) : boolean {
    return isNaN(parseInt(rowString))
}

export default class RadioShows {
    showList: Show[]

    constructor() {
        //First check if it's in local data, then set to that

        //If not, then fetch new data from headphones
        this.showList = []

        //If that fails, show error and set showlist to empty.
    }

    updateShows(showArray : Show[]) : void {
        this.showList = showArray
    }

    /**
     * Returns updated show list.
     */
    async fetchData() : Promise<void | Show[]> {
        return axios.get(archiveURL)
            .then(response => {
                const root = HTMLParser.parse(response.data)

                //console.log(root.firstChild.structure.substring(0, 100))
                const showTable = root.querySelector('table')
                //console.log(showTable)
                //console.log(showTable.text)

                let showRows = showTable.querySelectorAll('tr')
                //console.log(showRows)

                //console.log("\n\n\n\n\n\n")
                //console.log(new Date("2019-02-03T00:00"))

                let almostShows = []

                for (let i = 0; i < showRows.length; i++){
                    if(!rowIsHeader(showRows[i].text)) { //we want to skip the date rows.

                        //console.log(`${currentDayHeader.day} for item ${i}`)
                        //console.log(showRows[i].querySelector('a'))
                        //console.log(showRows[i].querySelector('a').rawAttributes)
                        let fakeshow = {
                            'name': showRows[i].querySelector('a').text,
                            'broadcasts': [new Recording(showRows[i].querySelector('a').rawAttributes.href)]
                        }
                        //console.log(fakeshow)
                        almostShows.push(fakeshow)
                    }
                    
                }

                almostShows = almostShows.sort( (a,b) => {
                    //console.log(`${a.name}     ${b.name}`)
                    if(a.name.toLowerCase() === b.name.toLowerCase()){
                        return 0
                    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1
                    } else {
                        return 1
                    }
                })

                //console.log(almostShows)

                //merge broadcasts into single show list that has every airing of the show.
                for(let i = 0; i < almostShows.length -1; i++){
                    //It's the same show!
                    //console.log(almostShows[i])
                    //console.log(almostShows[i + 1])
                    if(almostShows[i + 1]){
                        if(almostShows[i].name === almostShows[i + 1].name){
                            //console.log(`${i}, ${almostShows[i].name}`)
                            almostShows[i].broadcasts.push(almostShows[i + 1].broadcasts[0])
                            almostShows.splice(i + 1, 1)
                            i-- //we must decrement after removing the dupe to handle more than two airings.
                        } 
                    }
                    
                }

                let realShowList = almostShows.map( fakeshow => new Show(fakeshow.name, fakeshow.broadcasts) )

                //console.log(realShowList)

                realShowList.forEach( show => show.broadcasts = show.broadcasts.sort( (a,b) => {
                    if(a.startDate.getTime() === b.startDate.getTime()){
                        return 0
                    } else if (a.startDate < b.startDate) {
                        return -1
                    } else {
                        return 1
                    }
                }))

                return realShowList

            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

    getShowsOnDay(day: number) {
        return this.showList.filter( show => show.broadcasts[0].startDate.getDay() === day )
    }

}