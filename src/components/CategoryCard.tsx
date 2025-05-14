
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut"
      } 
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="relative overflow-hidden rounded-xl shadow-md group animate-hover"
    >
      <Link to={`/menu?category=${category.id}`}>
        <div className="relative h-48 sm:h-56">
          <img 
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <h3 className="text-white text-xl font-semibold">{category.name}</h3>
          </div>
          <div className="absolute inset-0 bg-brand-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
