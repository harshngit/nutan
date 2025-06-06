export default function ProductBadage() {
  const features = [
    {
      img: "/asset/Shop/trophy.png",
      title: "High Quality",
      description: "Crafted from top materials",
    },
    {
      img: "/asset/Shop/Tick-mark.png",
      title: "Warranty Protection",
      description: "Over 2 years",
    },
    {
      img: "/asset/Shop/shipping.png",
      title: "Free Shipping",
      description: "Order over $150",
    },
    {
      img: "/asset/Shop/customer-support.png",
      title: "24 / 7 Support",
      description: "Dedicated support",
    },
  ];

  return (
    <div className="w-full bg-[#FAF3EA] py-[100px] lg:px-[53px] px-[40px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[55px]">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-[10px]">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-12 h-12 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-[24px] font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-[20px] text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
