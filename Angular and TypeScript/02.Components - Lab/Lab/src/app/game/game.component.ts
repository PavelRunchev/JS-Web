import { Component, OnInit } from '@angular/core';
import { Game } from '../domain/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  games: Array<Game>;
  isShown: boolean = false;
  isSearchGame: object;

  constructor() {
    this.games = [
      {id: 1, 
        title: "Tomb Raider", 
        date: new Date("5 Mar 2013"),
        content: "Tomb Raider is presented in third-person perspective. Players take control of the series lead character Lara Croft. The game uses an interconnected hub-and-spoke model that combines action-adventure, exploration, and survival mechanics. Players can traverse between the camps and across the island using footpaths, improvised or already-available ziplines and climbable tracks. Many of the players moves are carried over from the previous games created by Crystal Dynamics, with some tweaks added, such as incorporating elements of stealth gameplay. Quick time events are scattered at regular intervals throughout the game, often appearing at crucial or fast-moving points in the game's plot, such as extracting a shard of metal, and escaping a collapsing cave.",
        image: "https://ips.pepitastore.com/storefront/img/resized/squareenix-store-v2/20ea4a789bb065977852b9aff9697814_620_KR.jpg"
      },
        
      {id: 2, 
          title: "Shadow of The Tomb Raider", 
          date: new Date("14 Sep 2018"),
          content: "Like its predecessor, the game is an action-adventure game played from a third-person perspective. The game's hub is set to be the largest in the franchise which also reveals the hidden city of Paititi. Players can participate in side quests and missions and learn about Paititi which provides a richer experience. There are numerous adjustments made to gameplay, which is otherwise identical to Rise.",
          image: "https://cdn.images.dailystar.co.uk/dynamic/184/photos/444000/620x/Shadow-of-the-Tomb-Raider-LEAKED-Release-date-and-trailer-OUTED-for-new-Tomb-Raider-game-688808.jpg"
      },
      {id: 3, 
          title: "Rise of the Tomb Raider", 
          date: new Date("10 Nov 2015"),
          content: "Rise of the Tomb Raider is a third-person action-adventure game in which players control Lara Croft, who is on a quest to discover the legendary city of Kitezh. Combat is a major gameplay mechanic; Lara has a large variety of weapons at her disposal (including assault rifles, shotguns, and pistols), some of which have an alternate firing mode. Players may also utilize stealth to progress through portions of the game, using bows and arrows to take out enemies, creating distractions to draw enemy attention away from Lara, or hiding in bushes to evade enemies. Lara can use the environment to fight enemies, shooting explosive barrels, tearing down rope-wrapped structures with rope arrows, or ambushing enemies from high ground. She can also use her pickaxe and combat knife to engage in melee combat with enemies.",
          image: "https://images-eds-ssl.xboxlive.com/image?url=8Oaj9Ryq1G1_p3lLnXlsaZgGzAie6Mnu24_PawYuDYIoH77pJ.X5Z.MqQPibUVTc2o3CUeLjyOLvRLvrq4.TZ6PbdwVLqE2XfqIENCPFJvmpgjYw7Qhcudco8BZa0MDNUcMgdL0WjStU4zMaLG0.qtVChoQ_wkWO57DvTo.bSHIXilbLRRkICrYCGg_AqD9DdizNgHhG.NxWtHM_tEnERYktQDJ9Ik1sdsV.c.RqLSI-&w=200&h=300&format=jpg"
      },
      {id: 4, 
          title: "Tomb Raider Underworld Shadow face", 
          date: new Date("18 Nov 2008"),
          content: "Tomb Raider: Underworld is a single player, action-adventure video game. The game is presented in third person perspective, where the player takes control of Lara Croft. Lara's environment reproduces a more 'interactive world that reacts and remembers', such that footprints left in the mud or mud transferred to Lara's knee from kneeling on the ground is washed away by rain, the bodies of the foes she encounters remain where she killed them, and any destruction to the environment she causes is permanent.",
          image: "https://i.pinimg.com/originals/eb/b7/78/ebb77815d52f7e1d3952076e639d5927.jpg"
      },
      {id: 5, 
            title: "Tomb Raider Underworld", 
            date: new Date("18 Nov 2008"),
            content: "Underneath the Mediterranean Sea, Lara discovers an ancient temple designating itself as 'Niflheim', one of the many Norse underworlds. Lara recovers one of Thor's gauntlets after a lengthy battle with Amanda Evert's mercenaries, and an encounter with an imprisoned Jacqueline Natla on Amanda's ship. Natla tells Lara that the Norse underworld, Helheim and Avalon are one and the same and that she will need to find Thor's Hammer to open the Underworld and find her mother. Lara discovers that she will have to find Thor's other gauntlet and his belt if she wants to find and wield the hammer. Natla provides Lara with a starting point for her search in this quest – coastal Thailand.",
            image: "http://www.tombraider-game.de/sites/www.tombraider-game.de/files/tombraiderunderworld_exclusive_wallpaper001_1920.jpg"
      },
    ]
  }

  notifyMe(notification:string) {
    console.log(notification);
  }

  showContacts() {
    this.isShown = !this.isShown;
  }

  showName(value: number) {
     this.isSearchGame = this.games[value - 1];
  }

  ngOnInit() {
  }

}
