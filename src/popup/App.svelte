<script>

    let showQr = false;
    let qrSrc = ""
</script>

<main class="relative p-4">
    <div class="trimMargins">

        <h1 class="text-lg">Hello 👋</h1>
        <p>Thanks for using my extension.</p>
        <p>It is free and open source and will stay that way forever.</p>
        <p>
            You can donate to the following addresses if you find it useful and want to show your appreciation with crypto.
        </p>
        <table>
            <tr>
                <td class="text-right pr-2">Bitcoin: </td>
                <td class="w-full p-1 text-[0.85em] font-mono border-1 flex">
                    <input class="bg-transparent flex-grow" type="text" value="38UyMvitNqKPqfmKMCj4wgTQLemT7z44LP">
                    <button class="text-blue-300 pl-2 pr-1 hover:underline" on:click={_ => {qrSrc = "/src/assets/images/btc.png"; showQr = true; }}>QR</button>
                </td>
            </tr>
            <tr>
                <td class="text-right pr-2">Doge: </td>
                <td class="w-full p-1 text-[0.85em] font-mono border-1 flex">
                    <input class="bg-transparent flex-grow" type="text" value="DDNSh3TAFi1eYUjikdS8x1TXquSFgCMAig">
                    <button class="text-blue-300 pl-2 pr-1 hover:underline" on:click={_ => {qrSrc = "/src/assets/images/doge.png"; showQr = true; }}>QR</button>
                </td>
            </tr>
            <tr>
                <td class="text-right pr-2">Avalanche: </td>
                <td class="w-full p-1 text-[0.85em] font-mono border-1 flex">
                    <input class="bg-transparent flex-grow" type="text" value="0xa96842d64a822dFe299DED1948e3b3cA4b5C7478">
                    <button class="text-blue-300 pl-2 pr-1 hover:underline" on:click={_ => {qrSrc = "/src/assets/images/ava.png"; showQr = true; }}>QR</button>
                </td>
            </tr>
        </table>
        <p>
            Link to Github repository:
        </p>
        <a class="text-blue-300 hover:underline" target="_blank" href="https://github.com/lassebomh/more-rich-results">https://github.com/lassebomh/more-rich-results</a>
    </div>
    {#if showQr}
        <div class="absolute left-0 top-0 flex justify-center items-center bg-[#0009] flex-col w-full h-full" on:click={_ => showQr = false}>
            <img src={qrSrc} class="border-4 border-white" alt="">
        </div>
    {/if}
</main>

<style>
    :root {
        background-color: #2f3235;
        color: white;
        font-size: 22px;
        width: 500px;
        min-height: 300px;
        padding: 0;
    }

    main {
        font-family: Arial, Helvetica, sans-serif;
    }

    * {
        font-family: inherit;
    }

    p {
        margin: 0.5rem 0;
    }

    .trimMargins *:first-child { margin-top: 0; }
    .trimMargins *:last-child { margin-bottom: 0; }

</style>