import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const coveragePoints = [
    { name: "Dhaka", position: [23.8103, 90.4125] },
    { name: "Chattogram", position: [22.3569, 91.7832] },
    { name: "Rajshahi", position: [24.3745, 88.6042] },
    { name: "Khulna", position: [22.8456, 89.5403] },
    { name: "Sylhet", position: [24.8949, 91.8687] },
    { name: "Barishal", position: [22.701, 90.3535] },
    { name: "Rangpur", position: [25.7439, 89.2752] },
    { name: "Mymensingh", position: [24.7471, 90.4203] },
    { name: "Cumilla", position: [23.4607, 91.1809] },
    { name: "Narayanganj", position: [23.6238, 90.499] },
    { name: "Gazipur", position: [24.0023, 90.4265] },
    { name: "Bogra", position: [24.851, 89.3697] },
    { name: "Jessore", position: [23.1667, 89.2081] },
    { name: "Narsingdi", position: [23.9322, 90.715] },
    { name: "Noakhali", position: [22.8696, 91.0995] },
    { name: "Cox's Bazar", position: [21.4272, 92.0058] },
];

const MapAutoFocus = ({ target }) => {
    const map = useMap();

    useEffect(() => {
        if (target) {
            map.flyTo(target.position, 9, { duration: 1 });
        }
    }, [map, target]);

    return null;
};

const Coverage = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPoints = useMemo(() => {
        const cleaned = searchTerm.trim().toLowerCase();

        if (!cleaned) {
            return coveragePoints;
        }

        return coveragePoints.filter((point) =>
            point.name.toLowerCase().includes(cleaned)
        );
    }, [searchTerm]);   

    const focusPoint = filteredPoints.length === 1 ? filteredPoints[0] : null;

    const onSearch = (event) => {
        event.preventDefault();
        setSearchTerm(inputValue);
    };

    return (
        <section className="my-6 px-4 sm:my-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-[24px] bg-[#F3F5F4] p-6 sm:p-10">

                <h1 className="text-secondary text-3xl font-extrabold sm:text-5xl">
                    We are available in 64 districts
                </h1>

                <form
                    onSubmit={onSearch}
                    className="mt-8 flex max-w-xl items-center rounded-full bg-[#E8ECEF] p-1.5"
                >
                    
                    <label htmlFor="district-search" className="pl-4 text-sm text-[#67767B]">
                        🔍
                    </label>
                    <input
                        id="district-search"
                        type="text"
                        value={inputValue}
                        onChange={(event) => setInputValue(event.target.value)}
                        placeholder="Search here"
                        className="w-full bg-transparent px-2 py-2 text-sm text-secondary outline-none placeholder:text-[#8A959A]"
                    />
                    <button
                        type="submit"
                        className="rounded-full bg-primary px-6 py-2 text-sm font-bold text-secondary"
                    >
                        Search
                    </button>

                </form>

                <div className="mt-8 border-t border-[#D9DFE2] pt-8">
                    <h2 className="text-secondary mb-5 text-2xl font-extrabold">
                        We deliver almost all over Bangladesh
                    </h2>

                    <div className="overflow-hidden rounded-2xl border border-[#D2D9DC]">
                        <MapContainer
                            center={[23.685, 90.3563]}
                            zoom={7}
                            scrollWheelZoom={false}
                            className="h-[320px] w-full sm:h-[400px]"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            <MapAutoFocus target={focusPoint} />
                            
                            {filteredPoints.map((point) => (
                                <CircleMarker
                                    key={point.name}
                                    center={point.position}
                                    radius={7}
                                    pathOptions={{
                                        color: "#03373D",
                                        fillColor: "#CAEB66",
                                        fillOpacity: 0.95,
                                        weight: 2,
                                    }}
                                >
                                    <Tooltip direction="top" offset={[0, -2]} opacity={1}>
                                        {point.name}
                                    </Tooltip>
                                </CircleMarker>
                            ))}
                        </MapContainer>
                    </div>  
                </div>
            </div>
        </section>
    );
};

export default Coverage;
