import React from 'react';
import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

interface HeaderProps extends ViewProps {
  title: string;
  subtitle: string;
}

const Heading: React.FC<HeaderProps> = ({ title, subtitle, ...rest }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View >
  );
}

export default Heading;