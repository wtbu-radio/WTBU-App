class Recording {
    url: string
    startDate: Date

    /**
     * Initilizes Recording object representing a saved broadcast of a show.
     * @param url Raw URL from headphones table
     */
    constructor(url: string){
        //Ex. LoadArchive.php?mp3file=WTBU-2019-02-03_0000_to_0200_Aircheck.mp3&realname=Aircheck
        this.url = `http://headphones.bu.edu/Archives/${url.substring(url.indexOf('=') +1, url.indexOf("&"))}`
        this.startDate = new Date()
    }
}

export default class Show {
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