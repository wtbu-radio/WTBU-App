export class Show {
    name: string
    oneWeekURL: string
    twoWeekURL: string
    airDay: number
    airTime: number

    //djs?
    //custom show color?
    //custom show image link?

    constructor(name: string, oneWeekURL: string, twoWeekURL: string, airDay: number, airTime: number) { 
        this.name = name
        this.oneWeekURL = oneWeekURL
        this.twoWeekURL = twoWeekURL
        this.airDay = airDay
        this.airTime = airTime
    }

}