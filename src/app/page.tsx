import Ignition from "@/components/sections/Ignition";
import EscapeVelocity from "@/components/sections/EscapeVelocity";
import Instruments from "@/components/sections/Instruments";
import ChartedLights from "@/components/sections/ChartedLights";
import Frontier from "@/components/sections/Frontier";
import Constellation from "@/components/sections/Constellation";

export default function HomePage() {
    return (
        <>
            <Ignition />
            <EscapeVelocity />
            <Instruments />
            <ChartedLights />
            <Frontier />
            <Constellation />
        </>
    );
}
