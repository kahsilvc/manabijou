import { useState, useEffect, useCallback } from 'react';
import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react';

const Carousel = ({ items = [], autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Função para avançar para o próximo slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  }, [items.length]);

  // Função para voltar para o slide anterior
  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  }, [items.length]);

  // Configurar o autoplay
  useEffect(() => {
    let slideInterval;
    
    if (autoPlay && !isHovered && items.length > 1) {
      slideInterval = setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, [autoPlay, interval, isHovered, items.length, nextSlide]);

  // Se não houver itens, não renderizar nada
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box 
      className="carousel-container" 
      position="relative" 
      height={["200px", "300px", "400px"]} 
      overflow="hidden"
      borderRadius="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {items.map((item, index) => (
        <Box
          key={item.id || index}
          className="carousel-item"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity={index === currentIndex ? 1 : 0}
          transition="opacity 0.5s ease-in-out"
          zIndex={index === currentIndex ? 1 : 0}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.alt || `Slide ${index + 1}`}
              width="100%"
              height="100%"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/1200x400?text=Mana+Bijou"
            />
          ) : (
            <Box
              width="100%"
              height="100%"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontSize="xl"
              fontWeight="bold"
            >
              {item.alt || `Slide ${index + 1}`}
            </Box>
          )}

          {/* Conteúdo opcional do slide */}
          {item.content && (
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              p={4}
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
            >
              <Text fontSize="xl" fontWeight="bold">
                {item.content}
              </Text>
            </Box>
          )}
        </Box>
      ))}

      {/* Botões de navegação - visíveis apenas quando houver mais de um slide */}
      {items.length > 1 && (
        <>
          {/* Botão anterior */}
          <IconButton
            aria-label="Slide anterior"
            icon={<Text>←</Text>}
            position="absolute"
            left="10px"
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
            bg="rgba(255, 255, 255, 0.7)"
            _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
            onClick={prevSlide}
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s"
          />

          {/* Botão próximo */}
          <IconButton
            aria-label="Próximo slide"
            icon={<Text>→</Text>}
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            zIndex="2"
            bg="rgba(255, 255, 255, 0.7)"
            _hover={{ bg: "rgba(255, 255, 255, 0.9)" }}
            onClick={nextSlide}
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s"
          />

          {/* Indicadores de slide */}
          <Flex
            position="absolute"
            bottom="10px"
            left="50%"
            transform="translateX(-50%)"
            zIndex="2"
          >
            {items.map((_, index) => (
              <Box
                key={index}
                width="10px"
                height="10px"
                borderRadius="full"
                bg={index === currentIndex ? "brand.500" : "rgba(255, 255, 255, 0.7)"}
                mx="2px"
                cursor="pointer"
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Carousel;
