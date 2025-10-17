export default function Gtag() {
return (
    <div className="hidden">
        <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2W5D1FJ4QV"
    ></script>
    <script
        dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2W5D1FJ4QV');
        `,
        }}
    />
    </div>
)
}