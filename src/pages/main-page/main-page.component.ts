import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa Router para redirección
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { WeatherServiceService } from '../../app/services/weather-service.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, SweetAlert2Module, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  weatherData: any;
  ciudades: any[] = [
    { 
      nombre: 'Madrid', 
      descripcion: 'Capital de España', 
      imagen: 'https://plus.unsplash.com/premium_photo-1697730214411-90916c40f30d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      animada: false 
    },
    { 
      nombre: 'Barcelona', 
      descripcion: 'Ciudad costera', 
      imagen: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFyY2Vsb25hfGVufDB8fDB8fHww', 
      animada: false 
    },
    { 
      nombre: 'Valencia', 
      descripcion: 'Famosa por sus playas', 
      imagen: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSExIVFhUVGBYVFRcVFRUVFRcVFRUWFxUVFhcYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLy8vLS8vLS4tLS4tLS8tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLf/AABEIAJYBTwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAIFBgEAB//EAEMQAAEDAgMFBQQHBwQABwAAAAEAAhEDIQQSMQVBUWFxEyIygZEGobHBFCNCUmLR8HKCkqKy4fEVQ1PCFiREo8PS4v/EABoBAAMBAQEBAAAAAAAAAAAAAAECAwQABQb/xAAxEQACAQMDAQUIAgIDAAAAAAAAAQIDESEEEjFBE1FhkaEicYGxwdHh8BQyBWIVI0L/2gAMAwEAAhEDEQA/ANySuSoBy7mWy5AJnUHNUSVErjgdRqWdUhNmqN6WruaimAiKyIKir6h4KArFPYBaZlwpSliEcVAUAnXNBS1WhwRy5QL0UAUIIUmORXPBQy1NcFggepZ0GF7MgEJJUmOhCFVSkLjhhtREbUSi6HInWHm1FLMke0XRWXAHQvZUu2qitqLrgsSLVAsRQ5eIXXOFixQLEyQokI3OFsiiWpgqBC64ABCE4plzUB7UbnAiV7MouUMyYUOHrsoAcu5lxwaVEqIcvSuOIuQ3BEKG5FABkIbgilQcimA0rXqTgly1zdUWnUWI1A6gcEI4hwT4UHUxwXbjrCYxg3hd7RpRzhxwUDhkbo6wu+gDolqmFIViKBGi88cQipAaKiCERlRHxVRjBL3taDpmIE9JQwwOGZpBB3ggj1CfcmDaybaqlMoOQhczELgEnBcC92ik1E49mXcy7lQygEkWAqPZkLgcpCojc6wRjuKJklL9qi0qwQOIVGEIZcrFpBXH0WlFSBYSY5HY5Rfh+CjEIgGWvRmvSTXojaiBwyXKJQu0UDXC46wYqJQH4lCdi+SJ1hoobggtxPJEFQLjrAqjEs5qdJQ3NRUhWhQLqK5iGQmuLY6CvF6gvELgnTUQnVFIhQIRARzlczLpUCmONkUJ9MKIrrvaLzbs2WBmQutqKReFBwTXBYJnXsyAVzMicNAodQobaiTx2KkQIg2J4zuHJFK4rPmXtDtR1aq509Bwb9lvQCPMlJ7N2nUpv+rcWneJIaf2h81v8VhmPEOY1w4Fojy4LNbU9mgAXUQebJJd+6Tr0K7sWsoo66eGiype1bmAGozM3TM0iQ77rxEce8IBjTUAG0famtH1bWNB+14zy1t7lnqWMA7pAyxkIIi06HnI11kTuUqlPJ3fEx3hJ4b2nmPyOhCtSu8TWTNUkrXg8Fls/btZtVrn1HOaSA8GIymxIG4jW0aLfdnC+TAGHA7tDxG7zX1TD1GvaHB0z8d4PNNNWBTbYyAomkuNaQiCopXLWFjSUTTKeBCK2F287aVBaVGSrp0FLVaLUymK4iDMQQjjGKr2jiw0lrG53aWMNB5uO/kJPRUNelWq+N7ImzcwDZ6DU9ZKZtCmgxXtHSZYOLzwZceunoqvE+1FQ+BjWjn3j8h7ki3ZL5iWfxCfRdfsmqBOSeYIKB1wdXa+IdrUcP2Tk/phLuxLzq9x6ucfmiOoOHiBB5ghRLERbgu0dxPqV1mMqN0qPHRzvzUuzKg6imA2M0/aDEN/3Mw4OaD7xB96eoe1X/JSHMsd/wBXfmqN1JAfTRsLuZusHtihUs2oAfuv7h8psfIp50jRfMnNTuA2vWo2a6W/dd3m+XDyhdtCqnefQqbiEWZWf2X7TUqkB/1buZ7h6O3eavpSMdZOOahOail6iXIpgaBhi8WqRKgUQESENymShOcmQCLihucuuehFOgGg7VeNVBXJWKyNQz2yk2uUpK6CusjrjL38CUPtDxQ8yW2jj2UKbqtQkNbEwJJkgAAdSuscA23tXK6lh2nv1nAGNW0xd55EgOAPXkmX3XzuntltbaVKqCS0vDRNoDmljQB1ML6KU0bCyyBIUC1GIXiFS4tig2vshr5e1jS/eLDN58eapuza5hbOUDjMtcN/yI4dAto9qo9t7JL5fT8e8bn/AP6QlnIYqzKCpsyqNWehafmtJsvGCm8wZYTfpud1hUexsfnDqLrPYDlmxLRuPNunSOCs6bFRNSQiht4NgDwKkGlVeyMRLch3XHTh5fNWAeoNWLIMDC6agQc8rod0QCTJB3quxFRz7NJDeO935DkLn1gr25jwb535xw4cfgTswNc1tTBtO7ujxH3aBTnUtwC1yvGzhw0trv4CBrxP6B27KbplEj8RtPlrZPMa0ETrFhmMNbx11/Wl1zXutcfxOkGTwBjXnu3csk60u8pGmhH/AElt8uaTYkEHrEoY2UYDaT4vqZaT+zy5/o2jZd3RGXQ7pj7Ijd/hTfVJPZgHg60z+ERu4ny6S7aV8P8Af397n7OJT4inUBDQ3tPvGJB3WOpS+JwdHMGuYWOP3d3UbvRaWtTFIANcM5F8sENb8JtYfo8Zs9jR2tVrYtFhmJOljqT1Tx1kor5d7A9Om/3Bk6uxXasIcPQ+irqlAgwQR1EFa5mzXVqksIYBeBPdB1Em5Q9qxTPZ1AHnfxHOdxW2nq4uW18meVBpbuhjalFLVWLV19jh/epu/dPHkfl8FU4rBFti0g89/HqtcZp8GeUGZ6oxCEhXNTDJZ2HTXEsyvc1P7K23Vod3x0/uE6fsH7PTRCfRQX00ORldG6wG1adZuZh01Bs5vUfPRM9svnFGq6m4OYSCND8iN4Wv2LtRtcQe7UGrdxH3m8uW73rrIdMuO0XsyHl5rklcEI5BexSLlAuRQARaolELlEuT3BYu5C6Au1KBbrF+BB+CYwmHDiLjoTHvXlSqxjHdfB6MaTcrCoYuZE/i8Jk4HmHNIHmCl84iMomDeTv367kKddVI7o5QZ0drswORZf2t2diahP1n/lob3GhshwI8UiXSYiD5LV1cPULCWQDBgm4kcRqsnjjjs/ZksJMEBskHeDfhE8oVHNNWEULclLsnYINanZ1ntcZOgaS7T93+YLfFLbMwLqTe+/O86mA1o/C0Aaczr7lPPKeGEJLLJyvJt1LMyW0/MEnQX19VTbRxZpsMFme2UPdAud8XjVBVU7+AzpNDhCVxWPoss+o0H7sy7+EXWYxlPEVfHjaTR92mHBvuufMlJs2C0f8ArG9BRd+aSVfuHjSXUc2htDC9sKnY1M3/ACQANC2S0OvY7wrKlVY9ocxwc07x8DwPIpFvs7Taw9rUeZktJYabYySNWkm5addOsqlp7Kr0n56Fak47xmIzDg5pF/WUtHVbilTT7TYYarlc07pv0Nir0lZnC1C5gLm5XHVsh0EGCARqFosMS5jTyv1FitTknkzODOlyUOOaTADn8mAm/wCI7gpPpmpUFP7Iu+8SOE+nqrkNawWygAWAGg5KFSrbCOUSsp4mrBy0CI35mW4nXXW+71mLse9sk0HWnLqQLXJiZN9f7q+wz+64yN1xprvE3004xwKTrGdwP+Z92vVYZVs8F40sclUNsMnLLmk+JzrHdu1nysmKDm1DlZAAsT4SZvA39T89O1aTHd1wMGecCbkC9/zQn7Mpnw9028JLcrd1rgk31HwuqnF9LHOEkWNU5fq6RObRx3N/C3eDHOyk6qKAAABqOFouGjiRrHxVTRp1qUdmZBJhpABy3JJN2i992q7hNohrprNdmmC4iAXcvskDQQUrpp8O67urfiHc14fJFthKbRNWob+Iz4p4ui88B05Bca99d8nwjQGJaDqTFi4/24kq9r9IcIs1psDZ1rZ3DUE7h+g1jMWKDAGwSfC0/wBRI3fFSe5St/7fov3kZWa/1XqNY7Gspt7Jgh2t9W/j5u4f2QtlbMn6x4Bm4a7UzvJ/PVK7MwsnPUuXXAd9o8TuPT5Im19plv1TCSTZ28ifstOs8flu5J37Kn8WG6/vP4IT209jnZKLYPhJ5zo2Nev6IhSqBuWszMBvi46/mrfZWBa0ZnjvnQEWA5c+mir9vY7K7Kwy7QnU9OfmtVGu3Ps6fC6kKlPG+XkU9fZgMmkZixabHjHL9XVS6gc2WDmJgCIN1f4PZoy5s7m1CZndH4hEm+/4pqhSNnPguEweHmvSp11JtdxklTaSZk8XgXM8TS3qLeqQq0V9DdBEESFT47YLHXpnIeGrfzCtuE2mKq0ksC5pDgSCDII1BV7j9nvp+NsDiLt9VXVKKa4tjR7F2t2zYNqjfENxH3m8uW70VlmWAgtMgkEaFaXZe2A5pD7OaCTzAHvRQblwSolkd773ysoNeCARoQCOhTGKpgU6bgdc1ukfOUG8oZdRYuQyVwuUC5VFA/6hWENbVZEMEkzoxjXajiCn8Pt2qDBfTGgJG7SYBCxv0mrMdizhq3X+BeOLd/xNPTKf+q+ecJuO139D2+2gndJG6r7fdYh1Jw5lzTG4aWTP+rUD/ut9V8++nka0fQUz8SFwbWb/AMT/AOCmPmmpQnCNk36CVK0Zu7S9Tfv29SDDDml2oEmJggSY0uq/ZuOp05fUeH1X3c4RAFoYzg0QOvoAphtmZmB+ZrQRPeY0EDneyrsZjqVK2dtTmxvdH7xsfJaE5Lm5nlJeBpqm2aZ+0PVCG1KY0c2eboHrBhZmhtam7Qf+3I9c6fwldr2ue0FzWeNwpODR1IlLOvGKy7fD8BjBvhJ/H8j+Oxz3U4biKTCSNM2gzjXX7Q9FmqmzXEz21Fx4ue//AOo5+5X+DcKk5Mjsol2UuMDiZYANEalRLrhmYcWllT+gkqMXSu7zz42+yKS3tf08r/czQwNXdWo+R5c2/qVMbPq/89P+P8Vvs8CtIabRqMp4OGU+jlDE91stpl54Nyg+9XdNNYJxnZ5QjVpVHWOJpkdmGgFwjMGtad3I+5VeI2TVcLVqQPKpA8506LuI9pBJYKRbUloDXC5JcLEECJEqGI264EjIwEEggtMgjUXUKdPs/Zj9C8qin/b6jOBo1aZALmFrvEA8WP3hPTzWu2Njndi6mzvOk2FxBAuTpCwQ2wTcxGtms89VuvYsTSDo8Um4ANzAMNEaBVnKTj7SETjH+ryWWBo5Bpc3ceJ4SpfSw7eLcY1gnjy944IlSvAcZAgE6G3NV+fSY5Dp9o/wlZKlV3sCMUWOHxIc03/ZgaxqYmd8BI1Kk6NFo09wUMMSHF7oiCRwECXR6oGzQXOAm0SQCL/anXgpN5yVQxSYZnvSSQPz6Ig5mRpcRmcPd+uStadO15kNzG06/wCF04USBbujpr/hO2hdrKsPMwJvckGQI3CdP0VFwaQJb3PstA8XVhEE8PVPjAAhog97vGDM77nXUhRfhfE8mYkNBtcC5E75t5JGxkinq4CPA6KjjLWtsxotfKbgAakHUpSvUdTqxVdnJLTN3gAfZNpbYTedZV9XoPpMkwXOkudfK2LkgX00DQLk80thMIc5BDg6AZMnsweBP+4Yng33Fo15RV3lfvoJKkpYXJ3EbeaWdyS5w4S0cTOh5D1CnsnAFsVH+PUNN4njvzfBAxGy2OhtGGkH6x4s4HeHDSo4756ygHE16bjTb9ZlHiDScp/EyZ/hJ6IXhKGyk9r63+4GpKW6efcWW19r5GFgHeO6xty/VvRC2Rs1w+tqQXm4ad3M8D8PhX7Ipse81ajw4z3RuniZ38irrF4jIIabndqBz5dNFRwcbaekueX3/gRNS/7Z9OEDxMTA11ItIPlxStapFt6QxmILdPEd53c0tg3QS41bkHfUJH1faNILRFwCt0px08NqyycKcq0tz4LVmyw/vVJPBoMep46+YTrcIGgRIHWRpJib6d6OoVTS2g4Q4vpkjN9lwMDJU1a0SYOaSPmmxtBu8mxAIgOacji06BpF3RpwWB1Z8p58vmbuzhw1jzD1adu8BBtuIJ3D9cQqXG+z7HXpnIeGrT8wrmliWva4EiI7uWQBAG4G0OYIv8FBte5Byi+uaD4hMAnTvj0V6X+QlHFWNvEjPRxeYP4GI2hsx9PxtIHHUHzVbkLSCDBFwV9PIa6wIcCB87R5H0VVjvZym+Szun1b/ZehDUwmrpmKWnlF2M8zbEU8xaYbZ+XUcCAdQdEvtn2rayi0N8YLiQ6bNJIBA3mRpI3ao2N2TVomS2RpYZgQdQRvB4LL7T9n3NIqU2VMjzBGV57LiSSO80bjayNWq0lJBhTzY9Q20+7WvLRYyBIJtqLlo1NlbYDHYqq4NYc7joAwcJv3RuBRfZ9mCFCp2gZmcXQS8ggMHdyQImHC8XnkifRyzCF9GuOzc4TTJAeTbKe9EAd8c/h48/8AK1LuKVs2u+PQ9OGhhy8+4PtGmzMZcQ4cGGD0mN3LcLWXGtb2Tg6ZMjtMsZZieM7zyJEb0ph3uqVWt+8YvxK8S4ks3Sf7fBbrK1m+DG5XykSp4QHMHVZAa57opuO6HxeWjQh27gUq/AtEHtby3/bN3AwN+8WI43TAoug8wWnoSJ+CC3AnP0v5yFaHvJTv3D2MLqgf2ziRHcaG1GNpnM25EHNaRfikaWFZ2T5c0mW94MdAA3ekdVs+wY9hBi4APrPyVBtPZYa0hu8g+kqdSClz3rvDCWzp0KSphJaGtqgA+Ilr7jgICd2OyowkU3tcDq0tqlh3XyhQpbOdEH4LTez1Ps8NiG/ad4fRoWXVbVTaUb8YL0m284M/gqLRSqXOctqAPaarWNtTDS7KLgS6ZB8QVQzZhF24pjSDoO0JEay8MHPctrsPZ4bTrtP26bgPNjvyHokcJ7L0/tJae1Slhjyu7cFVh8djaMD6fTIgnLUFR7Za4tjvU5ju6g8QraltJ1SW1Gszj7eE7Zr550n0yx3mfRW1HY2HbHcaY4gbzKJtGqA0BgDbXi28pOycn7ELPv4+RTfGK9qV13c/Mptr7IqVKFSXCo4AinnpChVDwRvc+IPQKn/8LVTlzOIeW/WB5YQ10NzHM0mQSTe5RdtYlxpvaAe9DSTP2nD8lUuqVe6JNm5dTwaPkt9KjK3tO7/fAxVa8FL2UPbP9l6uYzWpMylzSS7PnGaAWsi7TM33cFudikUQxha6zQy4OogE3HqsHs0PZFUG7TmbMEgh0jcvomBJqNzcy4dXXKnXjJWSyv3wDCUWrvDO7SxLBAF+PdtqI+fuVWHg3JEwb/iLdT/Mnqge24vJHG0wPkEEYipv4fiGl+PRZ+z7/mO5p8P0H8W5gp3cLNy6jfHyQ9k1KTHPc54ALA1sG9zE2PVCdXdBPDm4aiPiU1s5+buua7ugeBwFx3byLi6WVPGfmNGavh+hdf6lQ731m9rdTpa9/wBo+ik/adGH/WX8I00jW/Nx14Jars9sERV4SHM1MRHd5qNbZrb2qWie7TPD81Hs4+Pp9i7nLvXl+R52NoZpzts2BYbzf+n3oH0mkabRnF3Am+kuzEXPUb0pW2K2TBqTAsadO1z8fkkX7K7oIL76fVMvOm9cqcfEDnLwLyhi6L3kl4AbIaHGJMkF0TB8IjrPSVPG0gHu7QEy4xLZhthERMho9Vk6GynOzAOfILpikPvGL5hwQX7Kq5SQHwJnugaTP2uqZ6eDds+girSWcGpq1qLaYbmbeAcrgbuIkm8xeUljn020adOnUaDIaSSHWOaSZ36a8Vm37MrNu7OQTrEWJsNegUquFIyzTfecpzOvrz5FFaGEs7ut+mRZ6mS6FriKGHDcrHjtXf7hzZi6QTJvmJvrzQzwHC3yVJTouFRk06gMkNLnFzQY3iVZE1PvD3L1NJQ7KDW65hq1d7vaxotj7MYG9q/vONhvDQbevPcs5T2DUkGWETTmQJLW9rTP2dS17fRWGCwmKddhbHEyB7tUv2uMkgPpWjUVN5gb+K82tppKo32i+PQ9GnXTgvYfwOYXZT2tympTALGNcCG3+r7ObkcG+i8zYxIP1lPMcziO4BL2sjQ/epz5qFStjgcuehNv+XhI3ojamLNnmiSPxVhoOqktK+d0c+JTt+m2XkddsZ2aQ6jAdI71PTts/wDS+oPJM4fZlQC9Vh7oEF9NwJDSN54gH95Ay4jvANYYMEh1QwRzJEKdKm6Dnc9pnRrnn1uVRaSbxGS+DEeoisyi/IZdsmT4GEXu2oGGDmGgJBtUfpF55Kbs1NuYmWg97MW2mBAc0nfxG/ckQ8NMl1R3JwqEHqq+sW56ri5+Wo/MGBhhoyMGXvNJN2zPOFSOjrxd0xHqqT5RrKZkiDBgmDru9ddy9iMOHjgVkaNekw2DrXHiF+IgCFcYbbhIMU3PgbmuMXFza/DzWiNKssySv7xO2pPCZktqezHZVKmSgXteS+cz4YSLtDW2gGSOsblBmy8WWNp9k/LlaQ3MQ0yJkyeLZjiea1jtpOc4OdTrW3CmPfJT9TaQrwOyc3KNSxjR7rkrHV0cpVOHZ+PHqaYamKjh/vkZSnsdzHyBdpB8wVbez+wHOfpuMXAMnr5q7xLBnd1Vv7OOaHybWKvXV6N+LpZ95Gm7VGu65hsfsch7hFpPxQDsg69FsNoPDnuPEk+9Cq0IBniB/LPzVaN9kb82J1bbpWMu7A1GgG9/0Pgl+xc5bHacCk3y/pKzFCsA4zvKrp5drDdYjqIqnLbfoLfRiiUaDtOKuH0gRMKNCncdQrOCtwRjPPIo/CuYzNJvPpYfNIPxcb1qdoUPqS3gf/k/sspjcHAWbSVO1UnbiTXkaNXFU2l3pMg7Hc1F2IDt6SfTAUWAcfetbTSMkZJsscfssAXHA/wu/MKvrYVgK0+3aYgkEWbUPpWaP+yyVXEAmAsWgrS1FJT95t1kYUJ7RijQBGULZbAo/UjzHpH5rOYGhDQeK1WFOSi3qf8Aqr14uO23V/Rv6EaUoyvfoiVTDyD+tClvolk+yrIXS6yzSi7jKSKxmFlr/Ldx0TOzW5T1BCfoN+rqH9ge8/kUnMJLXuPe1i3Nex8j6f4XX1/FzHyj5KsbXsudsudIbti1+lXB4hBdX7kfdPwKrhWNuSiamvNDsrHdtcs/pAa6eIv5H+5UqeJBzN5n+a5+Kp31JEFKHF5H66pHR3B7axd1a4LADqI9RB+SQxuJBptG9t/e780lisWcoI/V0SjQz97iF38ay3SA9Rd2R12N7RhA8Xlqkq1EtXaLDSeZ0JVtUph7VspWoOy4ZlleqrvlHdkbT7gpkjgPVRMB1Q82/wApJVSWljweBB9CusxpzOnfPvU6uivNyXD+9zTS1qUVF8r7FvjacOa6Lw4nyBA+KliaYAqHfnb/ADEBKVcSXtF9zve6VM1CQ6TqR7jZZoaPbCMX0x6miWqTk2uv2HMLUGZ/ME+939kPDO79T09IHxKXJgE8QW+oKiKsfrmD8ly0mXbuS8jnqkrX8RsRmBIsWi0Djm+AKRFAy8O0JblsLNa1ot+8Heq5UxQ/XQpXF7XaA29wP+zvzWmnpJrqQnqoNFqylTEd1voE02o1gMACRFrbwfksNiNrucQGq5wtZxouJ1kfJanp5WVzOtVC+ArdrB9Sszc2mT+ap9jbQdTwlUgAuDqUZr/eB1UsLRyvefvtc0+cX9ylRw8Nczc7Kf4Zj+oqH/HPtZTT5cX5c/Ur/PTgotdJLz4NNXqS4niSV2hiiw2QoUS1a3Si47WsGVVpJ7lyTNST1Tu0HiDH3/g0BV0LziT6yllQUpRfcNHUNRku8LiK+cQdNfRoHy96yO1MaA6Oq05WV9ptnmQ5osAZWinCKwjJXqytuLTY20M8tnQK1ww77f2m/ELIex7TnedwAHmStRngg8DK6cLpoFGq8SZZY6p3YnUuPo90KsrUwRdeqVSY5D5k/NDJKnRoKlHavEvWr9pLcxDE7Pn/ACqyrgHDRXrnlV2PxcBaFFszSlFZG8Xi8+HdMF5ZWEftV2RboqLA4CDJUcFXcSZNuvOVZ06n6spafSxoJxjw235jVtX/ACHGUuiSHMPTkgK2c8wG7hMecfkksBTm6ehNJK40ZOx7DVIMFNufZIv80L6XFrqE6d8lIzsaHCiaNTkWH+pVzwpbNxoyVRxZPmCI+Kr6uM/VlkUHuZpc1tQ1vUlWPxh4LoxhNuipsZPeiwLwhdvw4pdtS9zvRWth0oNRO3SICqXEtS+PwxDg48lYPpTdp9yLScHjK5dv25SOcN2GyQw7XsgJag80jlcLblJs0n/hVhUotqtlTclHDymPtcsrDR6vhQ9p00VNRxLqbsjtNybw+M7MuYTpoq7a1WQXWVKUc7JcE6ssbo8j1VodMKsqNgnkkMHtkgkGLRCFV2o3MTe5W+lTkntfBgq6iDSkuS3o14snGYgQqJ2JGspattMiwPuRemUmH+aoo0WIxYiOZKq8VtQDeqGvj3u1KVdUVoUIxM9TWTnwWWJ2o46JB1VzjqgAyVZ7Pwwm6qoozOc27Njuy8DFzqr2j4XDp8VXsfG5FbW5FSnG5spy2qwfIF3IhCsvduENo+80PZqJpry8sprOGmuFi8vLjgL2pfFUQ5pB3gheXk6JyKLYGH7M1RzHzVo9y8vKz5M8cIEXob6q8vIpCybEcbioCosRULjdeXldLBinJuVmFpmBATuCeSV5eRawLSb3pGko1IARW4rkvLyxnsILY7kni8MdQV5eShTEGvIn0QXPXl5ZpovFhqLpnoToFwViLg+5eXlK44U4gkAlO4TEzr+X5rq8pTeCkUToY8CoRB+KPjsQGQ6PSF5eU9z3IfatrGG4hr2XBRNqV+yrPaBax9QF5eQpe1U2viz+h1R2p7lyZvbJJOYAecqqdi35Y7tuq8vL2aEE4o8TVVJKTsV1bFXNvQJc1Cd5XF5bDEli56rUI3n9eaDUcRvK8vIMeC4BGqeHvKLTcSvLyVcjySSLfZmGBuQrqlSA0Xl5NISksXCBi8GLy8kLI6QePuUCV5eTI4//2Q==', 
      animada: false 
    },
    { 
      nombre: 'Sevilla', 
      descripcion: 'Conocida por su arte', 
      imagen: 'https://images.unsplash.com/photo-1688404808661-92f72f2ea258?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      animada: false 
    },
    { 
      nombre: 'Bilbao', 
      descripcion: 'Ciudad moderna', 
      imagen: 'https://plus.unsplash.com/premium_photo-1697729429126-7ee9de9dbb94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmlsYmFvfGVufDB8fDB8fHww', 
      animada: false 
    },
    { 
      nombre: 'Granada', 
      descripcion: 'Cuna de la Alhambra', 
      imagen: 'https://plus.unsplash.com/premium_photo-1691031428706-fe5eea849b2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YWxoYW1icmF8ZW58MHx8MHx8fDA%3D', 
      animada: false 
    },
    { 
      nombre: 'Málaga', 
      descripcion: 'Destino turístico', 
      imagen: 'https://plus.unsplash.com/premium_photo-1697729549014-2faefb25efba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFsYWdhfGVufDB8fDB8fHww', 
      animada: false 
    },
    { 
      nombre: 'Zaragoza', 
      descripcion: 'Histórica y vibrante', 
      imagen: 'https://images.unsplash.com/photo-1723049907822-8a9981482a84?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8WmFyYWdvemF8ZW58MHx8MHx8fDA%3D', 
      animada: false 
    },
  ];
  
  
  
  

  constructor(private weatherService: WeatherServiceService, private router: Router) {}

  ngOnInit() {
    this.getWeatherForCities();
  }

  agregarAnimacion(ciudad: any) {
    ciudad.animada = true;
  }

  quitarAnimacion(ciudad: any) {
    ciudad.animada = false;
  }

  getWeatherForCities() {
    this.ciudades.forEach((ciudad) => {
      this.weatherService.getWeatherByCity(ciudad.nombre).subscribe(
        (data: any) => {
          ciudad.descripcion = `Temp: ${data.main.temp} °C, Clima: ${data.weather[0].description}`;
        },
        (error: any) => {
          console.error(`Error obteniendo el clima para ${ciudad.nombre}:`, error);
        }
      );
    });
  }

  redirigir(ruta: string) {
    this.router.navigate([ruta]);
  }

  mostrarAlerta() {
    Swal.fire('¡Éxito!', 'Operación completada con éxito.', 'success');
  }
}
