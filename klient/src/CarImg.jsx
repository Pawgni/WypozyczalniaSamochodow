export default function CarImg({ car, index = 0, className = null }) {
    if (!car.photos?.length) {
      return null;
    }
    if (!className) {
      className = 'object-cover';
    }
    return (
      <img className={className} src={'http://localhost:3000/uploads/' + car.photos[index]} alt="" />
    );
  }
  