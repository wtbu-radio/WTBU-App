import axios from 'axios'
import HTMLParser from 'fast-html-parser'
import { Show } from '../modules/Show'


const archiveURL = 'http://headphones.bu.edu/'

export class RadioShows {
    showList: Show[]

    constructor() {
        this.showList = [new Show('Test', 'https://google.com', 'https://google.com', 0, 0)]
        this.fetchData()
    }

    fetchData(): void {
        axios.get(archiveURL)
            .then(response => {
                const root = HTMLParser.parse(response.data)

                console.log(root.firstChild.structure.substring(0, 100))
                const showTable = root.querySelector('table')
                //console.log(showTable)
                //console.log(showTable.text)

                let showRows = showTable.querySelectorAll('tr')
                //console.log(showRows)

                for (let i = 0; i < showRows.length; i++){
                    console.log(showRows[i].text)
                }

                //console.log(response.data)
                                
                // handle success
                //console.log(response);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    }

}

/*
        try {
            //Get its data
            Elements mElementDataSize = mShowList.select("table[id=bydate]");
            // Locate the content attribute
            int mElementSize = mElementDataSize.size();

            Log.d("WTBU-A", "tables "+ mElementSize);

            Elements headers = mElementDataSize.select("strong");

            List<String> linksDump = mElementDataSize.select("a").eachAttr("href");
            ArrayList<String> links = new ArrayList<>(linksDump.size());
            links.addAll(linksDump);

            //Example LoadArchive.php?mp3file=WTBU-2019-02-03_0000_to_0200_Aircheck.mp3&realname=Aircheck
            for(String link : links){
                //figure out what day of the week it belongs to
                String day = link.substring(37,39);
                String month = link.substring(34, 36);
                String year = link.substring(29, 33);

                int weekday = dayOfWeek(Integer.parseInt(day), Integer.parseInt(month), Integer.parseInt(year)); //sunday 0 through 6 saturday

                String nameHTML = link.substring(link.indexOf("=", 25) + 1);
                String url =  "http://headphones.bu.edu/Archives/" + link.substring(link.indexOf("=") +1, link.indexOf("&"));

                Show radioShow = new Show(URLDecoder.decode(nameHTML, "UTF-8"), url, "");

                Log.d("WTBU-A", "" + weekday + " " + radioShow.getName());

                archiveData.get(weekday).add(radioShow);

            }

            for(LinkedList<Show> weekday : archiveData){
                sortShows(weekday);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return archiveData;

    }

    private void sortShows(LinkedList<Show> shows){
        //sorts
        Collections.sort(shows);

        //combines duplicates
        for(int i = 1; i < shows.size(); i++){
            if(shows.get(i -1).isSameShow(shows.get(i))){
                shows.get(i - 1).setUrl2(shows.get(i).getUrl1());
                shows.remove(i);
                i--;
            }
        }
    }

}*/