export class Recording {
    url: string
    startDate: Date

    /**
     * Initilizes Recording object representing a saved broadcast of a show.
     * @param url Raw URL from headphones table
     */
    constructor(url: string){
        //Ex. LoadArchive.php?mp3file=WTBU-2019-02-03_0000_to_0200_Aircheck.mp3&realname=Aircheck
        this.url = `http://headphones.bu.edu/Archives/${url.substring(url.indexOf('=') +1, url.indexOf("&"))}`
        let datestring = `${url.substring(url.indexOf('-') + 1, url.indexOf('_'))}T${url.substring(url.indexOf('_') + 1, url.indexOf('_')+1 + 2)}:00:00`
        //console.log(`${datestring}      ${url}`)
        this.startDate = new Date(datestring)
        //console.log(`${this.startDate.toUTCString()}  ${url.substring(url.indexOf('_') + 1, url.indexOf('_')+1 + 2)}   ${this.startDate.getHours()}`)
    }

    getPrettyTime() : string {
        let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric',
            hour12: false,
        }
        //console.log(Intl.DateTimeFormat('en-US', options).format(this.startDate))
        const dateTest = `${this.startDate.getUTCMonth() + 1}/${this.startDate.getUTCDate()} at ${this.getPrettyHours()}`
        //console.log(`${dateTest}     ${this.url}`)
        return dateTest
    }

    getPrettyHours() : string {
        let hours = this.startDate.getUTCHours()
        if (hours === 0){
            return '12:00am'
        } else if (hours <= 11) {
            return `${hours}:00am`
        } else if (hours === 12) {
            return '12:00pm'
        } else {
            return `${hours % 12}:00pm`
        }
    }
}

export class Show {
    name: string
    broadcasts: Recording[]
    airDay: number
    airTime: number

    //djs?
    //custom show color?
    //custom show image link?

    constructor(name: string, broadcasts: Recording[]) { 
        this.name = name
        this.broadcasts = broadcasts
        this.airDay = broadcasts[0].startDate.getDay()
        this.airTime = broadcasts[0].startDate.getHours()
    }

}