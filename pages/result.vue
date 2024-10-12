<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

const startGame = () => {
    router.push("/result");
};

const showBible = ref(false);
</script>

<template>
    <div class="flex pt-5 items-center gap-y-8 min-h-screen flex-col">
        <FruitBackground />
        <dl
            class="flex items-center text-sm gap-1 flex-wrap px-5 max-w-xl mx-auto"
        >
            <dt class="font-bold">Jouw mix:</dt>
            <dd class="bg-white shadow-sm rounded-xl p-2">⚠️ Waarschuwing</dd>
            <dd class="bg-white shadow-sm rounded-xl p-2">🍏 Appel</dd>
            <dd class="bg-white shadow-sm rounded-xl p-2">🟠 Oranje</dd>
            <dd class="bg-white shadow-sm rounded-xl p-2">😇 Hoopvol</dd>
        </dl>
        <div class="text-lg w-full px-5 max-w-2xl mx-auto">
            <Typewriter
                text="Als je je angstig en machteloos voelt, kan Psalm 116 een bron van troost en kracht zijn. Het herinnert je eraan dat God luistert, zelfs in je diepste nood. Hij beschermt je wanneer je zwak bent en biedt rust wanneer je overweldigd bent. Laat deze woorden je hart vullen met hoop, want God is dichtbij, helpt je tranen te drogen en geeft je nieuwe kracht. Vertrouw op Zijn liefde en weet dat Hij je beschermt, zelfs als alles moeilijk lijkt. Je bent niet alleen, Hij is er altijd voor je."
                @done="showBible = true"
            />
        </div>
        <transition
            enter-active-class="duration-500 ease-out"
            enter-from-class="transform opacity-0 translate-y-40"
            enter-to-class="opacity-100"
            leave-active-class="duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0 translate-y-40"
        >
            <div
                v-show="showBible"
                class="shadow-xl bg-white rounded-t-3xl pt-5 px-5 pb-10 max-w-3xl mx-auto"
            >
                <p class="text-lg">
                    Psalm 19<br />
                    Het boek Psalmen<br />
                    HSV<br />
                    Schepping en wet vertellen Gods eer<br />

                    1Een psalm van David, voor de koorleider.<br />

                    2De hemel vertelt Gods eer,<br />

                    het gewelf verkondigt het werk van Zijn handen.<br />

                    3Dag op dag spreekt overvloedig,19:3 spreekt overvloedig -
                    Letterlijk: stort overvloedig woorden uit.<br />

                    nacht op nacht geeft kennis door.<br />

                    4Geen spreken is er, geen woorden zijn er,<br />

                    hun stem wordt niet gehoord.<br />

                    5Rom. 10:18Hun richtlijn gaat uit over heel de aarde,<br />

                    hun boodschap tot aan het einde van de wereld.<br />

                    Hij heeft daar een tent opgezet voor de zon.<br />

                    6En die is als een bruidegom, die zijn slaapkamer uit
                    gaat;<br />

                    hij Pred. 1:5is vrolijk als een held om snel het pad te
                    lopen.<br />

                    7Aan het ene einde van de hemel is zijn opgang,<br />

                    zijn omloop is tot het andere einde;<br />

                    niets is verborgen voor zijn gloed.<br />

                    82 Sam. 22:31; Ps. 18:31De wet van de HEERE is volmaakt,<br />

                    zij bekeert de ziel;<br />

                    de getuigenis van de HEERE is betrouwbaar,<br />

                    zij geeft de eenvoudige wijsheid.<br />

                    9De bevelen van de HEERE zijn recht,<br />

                    zij verblijden het hart;<br />

                    het gebod van de HEERE is zuiver,<br />

                    het verlicht de ogen.<br />

                    10De vreze des HEEREN is rein,<br />

                    zij houdt voor eeuwig stand;<br />

                    de bepalingen van de HEERE zijn waarachtig,<br />

                    met elkaar zijn zij rechtvaardig.<br />

                    11Ps. 119:72,127; Spr. 8:11Zij zijn begerenswaardiger dan
                    goud,<br />

                    ja, dan veel zuiver goud;<br />

                    en Ps. 119:103zoeter dan honing<br />

                    en honingzeem uit de raat.<br />

                    12Ook wordt Uw dienaar daardoor gewaarschuwd,<br />

                    in het houden ervan ligt groot loon.<br />

                    13Wie zou al zijn afdwalingen opmerken?<br />

                    Reinig mij van verborgen afdwalingen.<br />

                    14Weerhoud Uw dienaar ook van hoogmoed.<br />

                    Laat die over mij niet heersen;<br />

                    dan zal ik oprecht zijn<br />

                    en vrij van grote overtreding.<br />

                    15Laat de woorden van mijn mond en de overdenking van mijn
                    hart<br />

                    welgevallig zijn voor Uw aangezicht,<br />

                    HEERE, mijn rots en mijn Verlosser!
                </p>
            </div>
        </transition>
    </div>
</template>
