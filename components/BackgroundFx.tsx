export default function BackgroundFx() {
  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="grid"></div>
      <div className="blob blob-orange"></div>
      <div className="blob blob-blue"></div>
      <div className="blob blob-orange-2"></div>
      <div className="particle" style={{ top: "22%", left: "14%", animationDelay: "0s" }}></div>
      <div className="particle" style={{ top: "64%", left: "78%", animationDelay: "3s" }}></div>
      <div className="particle" style={{ top: "40%", left: "88%", animationDelay: "6s" }}></div>
      <div className="particle" style={{ top: "80%", left: "30%", animationDelay: "2s" }}></div>
      <div className="particle" style={{ top: "10%", left: "60%", animationDelay: "8s" }}></div>
    </div>
  );
}
