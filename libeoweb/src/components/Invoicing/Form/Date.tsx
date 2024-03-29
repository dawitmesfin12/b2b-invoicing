import IDefault, {
  IDefaultProps,
  IDefaultState,
  IType,
} from 'components/Invoicing/Form/Default';
import * as React from 'react';

/**
 * @class DateInput
 *
 * Herit from IDefault class, state and props
 *
 * Customized by default props
 * No default validation rules
 */
class DateInput extends React.PureComponent<IDefaultProps, IDefaultState> {
  static defaultProps = {
    id: 'date',
    label: 'date',
    rules: [],
    type: IType.Date,
  };

  render() {
    return <IDefault {...this.props} />;
  }
}

export default DateInput;
